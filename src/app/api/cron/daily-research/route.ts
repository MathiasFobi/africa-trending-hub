import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";
export const maxDuration = 60; // Vercel function max: 60s on Hobby plan

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "business" | "culture" | "innovation" | "sports" | "politics" | "music";
  author: string;
  authorRole?: string;
  publishedAt: string;
  readMinutes: number;
  image?: string;
  imageCaption?: string;
  featured?: boolean;
  trending?: boolean;
  tags?: string[];
  sourceUrl?: string;
  sourceName?: string;
};

type RawItem = {
  title: string;
  url: string;
  snippet?: string;
  publishedAt?: string;
  source: string;
};

type ExtractedArticle = {
  title: string;
  excerpt: string;
  category: Article["category"];
  author: string;
  authorRole?: string;
  readMinutes: number;
  tags: string[];
  sourceUrl: string;
  sourceName: string;
};

const ARTICLES_FILE = join("/tmp", "ath-articles-snapshot.json");
const DIGEST_LOG = join("/tmp", "ath-research-digest.json");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const TELEGRAM_RESEARCH_CHAT_ID = process.env.TELEGRAM_RESEARCH_CHAT_ID ?? "";
const VERCEL_DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL ?? "";

const SOURCES: { name: string; query: string; category: Article["category"] }[] = [
  { name: "Partech", query: "Partech Africa investment funding", category: "business" },
  { name: "Africa: The Big Deal", query: "Africa The Big Deal startup funding round", category: "business" },
  { name: "The Africa Report", query: "The Africa Report news business", category: "politics" },
  { name: "TikTok Africa", query: "TikTok Africa viral creator trending", category: "culture" },
  { name: "Disrupt Africa", query: "Disrupt Africa startup news funding", category: "innovation" },
];

// ============================================================================
// Helpers
// ============================================================================

const googleNewsRss = (query: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

function extractTag(block: string, tag: string): string | null {
  const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i").exec(block);
  if (cdata) return cdata[1];
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i").exec(block);
  return plain ? plain[1] : null;
}

function cleanText(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseRss(xml: string): RawItem[] {
  const items: RawItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link") || extractTag(block, "guid");
    const description = extractTag(block, "description");
    const pubDate = extractTag(block, "pubDate");
    const source = extractTag(block, "source");
    if (title && link) {
      items.push({
        title: cleanText(title),
        url: cleanText(link),
        snippet: description ? cleanText(stripHtml(description)) : undefined,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : undefined,
        source: source || "Unknown",
      });
    }
  }
  return items;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {}
  const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(text);
  if (fence) {
    try {
      return JSON.parse(fence[1]) as T;
    } catch {}
  }
  const repaired = text
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\r?\n/g, " ")
    .replace(/,(\s*[}\]])/g, "$1")
    .replace(/^[^[{]*([\[{])/, "$1")
    .replace(/([}\]])[^}\]]*$/, "$1")
    .trim();
  try {
    return JSON.parse(repaired) as T;
  } catch {
    return null;
  }
}

// ============================================================================
// Pipeline
// ============================================================================

async function fetchRss(url: string): Promise<RawItem[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    });
    if (!res.ok) return [];
    return parseRss(await res.text());
  } catch {
    return [];
  }
}

async function extractArticle(
  model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
  raw: RawItem,
): Promise<ExtractedArticle | null> {
  const prompt = `You are a senior editor at AfricaTrendingHub — a Bloomberg+TechCrunch+National Geographic publication tracking business, culture, innovation, sports, politics, and music across the African continent.

Source: ${raw.source}
Title: ${raw.title}
URL: ${raw.url}
${raw.snippet ? `Snippet: ${raw.snippet}` : ""}

Respond with ONLY a single JSON code block wrapped in triple backticks. No prose.

If the item is not about the African continent, output: {"skip": true, "reason": "<one-line>"}

Schema:
- title: <100 chars, Bloomberg-headline style
- excerpt: 2 sentences, 25-40 words, sets stakes
- category: "business" | "culture" | "innovation" | "sports" | "politics" | "music"
- author: realistic African correspondent name
- authorRole: their beat
- readMinutes: 4-12
- tags: 2-5 short topical strings`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 2000 },
    });
    const parsed = safeJsonParse<ExtractedArticle | { skip: boolean; reason: string }>(
      result.response.text(),
    );
    if (!parsed) return null;
    if ("skip" in parsed && parsed.skip) return null;
    const a = parsed as ExtractedArticle;
    if (!a.title || !a.excerpt || !a.category) return null;
    return { ...a, sourceUrl: raw.url, sourceName: raw.source };
  } catch {
    return null;
  }
}

async function loadExisting(): Promise<Article[]> {
  try {
    const raw = await fs.readFile(ARTICLES_FILE, "utf-8");
    return JSON.parse(raw) as Article[];
  } catch {
    return [];
  }
}

async function saveExisting(articles: Article[]): Promise<void> {
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf-8");
}

function isDuplicate(article: Article, existing: Article[]): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/[^\w]/g, "").slice(0, 40);
  const newKey = norm(article.title);
  return existing.some(
    (e) => norm(e.title) === newKey || (article.sourceUrl && e.sourceUrl === article.sourceUrl),
  );
}

async function postTelegram(articles: Article[]): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_RESEARCH_CHAT_ID || articles.length === 0) return;
  const lines = [
    "📰 *AfricaTrendingHub — Daily Research*",
    `${articles.length} new article${articles.length === 1 ? "" : "s"} auto-published.`,
    "",
    ...articles.map((a, i) => `${i + 1}. *${a.title}*\n   ${a.excerpt.slice(0, 100)}…\n   ${a.sourceUrl ?? "(internal)"}`),
  ];
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_RESEARCH_CHAT_ID,
        text: lines.join("\n\n"),
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("[cron] telegram post failed:", err);
  }
}

async function triggerDeploy(): Promise<void> {
  if (!VERCEL_DEPLOY_HOOK_URL) return;
  try {
    await fetch(VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
  } catch (err) {
    console.error("[cron] deploy hook failed:", err);
  }
}

// ============================================================================
// Main handler
// ============================================================================

export async function GET(req: NextRequest) {
  // Vercel Cron sends a GET with an Authorization header containing a bearer token
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (process.env.CRON_SECRET && auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const startedAt = new Date().toISOString();
  const log: string[] = [];
  const result = {
    startedAt,
    mode: "publish",
    sources: SOURCES.map((s) => s.name),
    rawItems: 0,
    unique: 0,
    extracted: 0,
    novel: 0,
    appended: 0,
    articles: [] as Array<{ slug: string; title: string; source: string }>,
    log,
  };

  const genai = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Fetch sources
  const allRaw: RawItem[] = [];
  for (const src of SOURCES) {
    const items = await fetchRss(googleNewsRss(src.query));
    log.push(`🔍 ${src.name}: ${items.length} items`);
    allRaw.push(...items.map((i) => ({ ...i, source: src.name })));
  }
  result.rawItems = allRaw.length;

  // Dedupe within new set
  const seen = new Set<string>();
  const unique = allRaw.filter((i) => {
    const key = slugify(i.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  result.unique = unique.length;

  // Extract via Gemini (limit to 8 to fit in 60s function budget)
  const extracted: ExtractedArticle[] = [];
  for (const raw of unique.slice(0, 8)) {
    const ex = await extractArticle(model, raw);
    if (ex) extracted.push(ex);
  }
  result.extracted = extracted.length;

  // Dedup against existing
  const existing = await loadExisting();
  const novel: Article[] = [];
  for (const ex of extracted) {
    const candidate: Article = {
      slug: slugify(ex.title),
      title: ex.title,
      excerpt: ex.excerpt,
      category: ex.category,
      author: ex.author,
      authorRole: ex.authorRole,
      publishedAt: new Date().toISOString(),
      readMinutes: ex.readMinutes,
      trending: extracted.length > 0 && novel.length < 3,
      tags: ex.tags,
      sourceUrl: ex.sourceUrl,
      sourceName: ex.sourceName,
    };
    if (!isDuplicate(candidate, existing) && !isDuplicate(candidate, novel)) {
      novel.push(candidate);
    }
  }
  result.novel = novel.length;

  // Persist
  if (novel.length > 0) {
    await saveExisting([...existing, ...novel]);
    result.appended = novel.length;
    result.articles = novel.map((a) => ({ slug: a.slug, title: a.title, source: a.sourceName ?? "unknown" }));
    await postTelegram(novel);
    await triggerDeploy();
    log.push(`✅ ${novel.length} articles appended + deployed + telegram notified`);
  } else {
    log.push("ℹ️  no novel articles to publish");
  }

  // Log digest
  await fs.writeFile(
    DIGEST_LOG,
    JSON.stringify({ ...result, finishedAt: new Date().toISOString() }, null, 2),
    "utf-8",
  );

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  return GET(req);
}
