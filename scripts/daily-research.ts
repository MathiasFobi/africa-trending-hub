// Daily research script — runs at 8 AM ET
// Fetches fresh stories from 5 African sources, dedupes against
// the existing articles.ts dataset, then either:
//   - appends new stories (auto-publish mode), OR
//   - writes a draft file for review (draft mode)
//
// Usage:
//   GEMINI_API_KEY=... pnpm tsx scripts/daily-research.ts
//
// Env vars:
//   GEMINI_API_KEY            - required, for content summarization
//   RESEARCH_MODE             - "publish" (default) | "draft"
//   VERCEL_DEPLOY_HOOK_URL    - optional, fires a redeploy after publishing
//   TELEGRAM_BOT_TOKEN        - optional, posts the new digests to Telegram
//   TELEGRAM_RESEARCH_CHAT_ID - optional, target chat for the digest post

import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RESEARCH_MODE = (process.env.RESEARCH_MODE ?? "publish") as "publish" | "draft";
const VERCEL_DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_RESEARCH_CHAT_ID = process.env.TELEGRAM_RESEARCH_CHAT_ID;

const PROJECT_ROOT = join(process.cwd());
const ARTICLES_FILE = join(PROJECT_ROOT, "src", "data", "articles.ts");
const DIGEST_LOG = join(PROJECT_ROOT, "data", "research-digest.json");

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is required");
  process.exit(1);
}

const genai = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

// ============================================================================
// Source-specific fetchers
// ============================================================================

// Use Google News RSS for sources that don't have a clean public feed
const googleNewsRss = (query: string): string =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

const SOURCES: { name: string; query: string; category: Article["category"] }[] = [
  { name: "Partech", query: "Partech Africa investment funding", category: "business" },
  { name: "Africa: The Big Deal", query: "Africa The Big Deal startup funding round", category: "business" },
  { name: "The Africa Report", query: "The Africa Report news business", category: "politics" },
  { name: "TikTok Africa", query: "TikTok Africa viral creator trending", category: "culture" },
  { name: "Disrupt Africa", query: "Disrupt Africa startup news funding", category: "innovation" },
];

async function fetchRss(url: string): Promise<RawItem[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    });
    if (!res.ok) {
      console.warn(`  ⚠️  fetch ${url} → ${res.status}`);
      return [];
    }
    const xml = await res.text();
    return parseRss(xml);
  } catch (err) {
    console.warn(`  ⚠️  fetch ${url} failed:`, (err as Error).message);
    return [];
  }
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

// ============================================================================
// Gemini-based content extraction
// ============================================================================

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

async function extractArticle(raw: RawItem): Promise<ExtractedArticle | null> {
  const prompt = `You are a senior editor at AfricaTrendingHub — a Bloomberg+TechCrunch+National Geographic publication tracking business, culture, innovation, sports, politics, and music across the African continent.

Given the following news item, extract and format it for publication:

Source name: ${raw.source}
Title: ${raw.title}
URL: ${raw.url}
${raw.snippet ? `Snippet: ${raw.snippet}` : ""}

Respond with ONLY a single JSON code block wrapped in triple backticks. No prose, no commentary, no analysis. Just the JSON.

Skip the item if it's:
- About a country other than African nations (e.g. just US/EU/Asia)
- Press release boilerplate with no editorial value
- Clearly spam, low-quality, or unrelated to the African continent

If skipping, respond with a JSON block containing exactly: {"skip": true, "reason": "<one-line reason>"}

Schema (use these exact field names):
- title: string — punchy, < 100 chars, Bloomberg-headline style
- excerpt: string — 2 sentences, 25-40 words, sets stakes
- category: one of "business" | "culture" | "innovation" | "sports" | "politics" | "music"
- author: string — realistic African correspondent name
- authorRole: string — their beat, e.g. "West Africa Bureau"
- readMinutes: number 4-12
- tags: array of 2-5 short topical strings

Example response format:
\`\`\`json
{"title": "...", "excerpt": "...", "category": "business", "author": "...", "authorRole": "...", "readMinutes": 6, "tags": ["Nigeria", "VC"]}
\`\`\``;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        // Gemini 2.5 Flash uses internal "thinking" tokens — needs at least 1500
        // for the response output. 600 was eating the entire budget on thinking.
        maxOutputTokens: 2000,
      },
    });
    const text = result.response.text();
    const parsed = safeJsonParse<ExtractedArticle | { skip: boolean; reason: string }>(text);
    if (!parsed) {
      console.warn(`  ⚠️  gemini parse failed for "${raw.title.slice(0, 50)}…"`);
      return null;
    }
    if ("skip" in parsed && parsed.skip) {
      console.log(`  ⏭️  skipped: ${parsed.reason}`);
      return null;
    }
    const article = parsed as ExtractedArticle;
    if (!article.title || !article.excerpt || !article.category) {
      console.warn(`  ⚠️  missing required fields for "${raw.title.slice(0, 50)}…"`);
      return null;
    }
    return { ...article, sourceUrl: raw.url, sourceName: raw.source };
  } catch (err) {
    console.warn(`  ⚠️  gemini extract failed for "${raw.title.slice(0, 50)}…":`, (err as Error).message);
    return null;
  }
}

function safeJsonParse<T>(text: string): T | null {
  // 1) Try direct parse
  try {
    return JSON.parse(text) as T;
  } catch {}

  // 2) Extract from ```json ... ``` fence
  const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(text);
  if (fence) {
    try {
      return JSON.parse(fence[1]) as T;
    } catch {}
  }

  // 3) Repair common issues then parse
  const repaired = text
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // curly single quotes
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')  // curly double quotes
    .replace(/[\u2013\u2014]/g, "-")             // en/em dashes
    .replace(/\r?\n/g, " ")                     // collapse newlines
    .replace(/,(\s*[}\]])/g, "$1")              // strip trailing commas
    .replace(/^[^[{]*([\[{])/, "$1")            // strip prose prefix
    .replace(/([}\]])[^}\]]*$/, "$1")           // strip prose suffix
    .trim();
  try {
    return JSON.parse(repaired) as T;
  } catch {}

  // 4) Last resort: greedy match first balanced JSON object
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let end = -1;
  let inString = false;
  let escape = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) return null;
  try {
    return JSON.parse(text.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

// ============================================================================
// Slug + dedup helpers
// ============================================================================

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function loadExistingArticles(): Promise<Article[]> {
  if (!existsSync(ARTICLES_FILE)) return [];
  const content = await readFile(ARTICLES_FILE, "utf-8");
  const match = /export const articles:\s*Article\[\]\s*=\s*(\[[\s\S]*?\]);/.exec(content);
  if (!match) return [];
  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return (${match[1]});`)() as Article[];
  } catch {
    return [];
  }
}

function isDuplicate(article: Article, existing: Article[]): boolean {
  const normalized = (s: string) => s.toLowerCase().replace(/[^\w]/g, "").slice(0, 40);
  const newKey = normalized(article.title);
  return existing.some(
    (e) =>
      normalized(e.title) === newKey ||
      (article.sourceUrl && e.sourceUrl === article.sourceUrl)
  );
}

// ============================================================================
// Articles.ts writer
// ============================================================================

async function appendToArticlesFile(newArticles: Article[]): Promise<void> {
  const content = await readFile(ARTICLES_FILE, "utf-8");
  const newEntries = newArticles
    .map((a) => {
      const tags = (a.tags ?? []).map((t) => `"${t}"`).join(", ");
      const fields = [
        `slug: "${a.slug}"`,
        `title: ${JSON.stringify(a.title)}`,
        `excerpt: ${JSON.stringify(a.excerpt)}`,
        `category: "${a.category}"`,
        `author: ${JSON.stringify(a.author)}`,
        a.authorRole ? `authorRole: ${JSON.stringify(a.authorRole)}` : null,
        `publishedAt: "${a.publishedAt}"`,
        `readMinutes: ${a.readMinutes}`,
        a.trending ? `trending: true` : null,
        a.featured ? `featured: true` : null,
        tags ? `tags: [${tags}]` : null,
        a.sourceUrl ? `sourceUrl: ${JSON.stringify(a.sourceUrl)}` : null,
        a.sourceName ? `sourceName: ${JSON.stringify(a.sourceName)}` : null,
      ].filter(Boolean);
      return `  {\n    ${fields.join(",\n    ")},\n  }`;
    })
    .join(",\n");

  // Insert before the closing `];` of the array
  const updated = content.replace(/(\];\s*)$/, `${newEntries},\n$1`);
  await writeFile(ARTICLES_FILE, updated, "utf-8");
  console.log(`✏️  appended ${newArticles.length} articles to articles.ts`);
}

// ============================================================================
// Telegram notification
// ============================================================================

async function postToTelegram(articles: Article[]): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_RESEARCH_CHAT_ID || articles.length === 0) return;
  const lines = [
    "📰 *AfricaTrendingHub — Daily Research Digest*",
    `${articles.length} new article${articles.length === 1 ? "" : "s"} auto-published.`,
    "",
    ...articles.map(
      (a, i) =>
        `${i + 1}. *${a.title}*\n   ${a.excerpt.slice(0, 100)}…\n   ${a.sourceUrl ?? "(internal)"}`
    ),
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
    console.log(`📨 posted digest to Telegram`);
  } catch (err) {
    console.warn(`  ⚠️  telegram post failed:`, (err as Error).message);
  }
}

// ============================================================================
// Vercel redeploy
// ============================================================================

async function triggerVercelRedeploy(): Promise<void> {
  if (!VERCEL_DEPLOY_HOOK_URL) {
    console.log("ℹ️  no VERCEL_DEPLOY_HOOK_URL, skipping redeploy trigger");
    return;
  }
  try {
    const res = await fetch(VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
    console.log(`🚀 Vercel redeploy triggered: ${res.status}`);
  } catch (err) {
    console.warn(`  ⚠️  Vercel hook failed:`, (err as Error).message);
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const startedAt = new Date().toISOString();
  console.log("📰 AfricaTrendingHub daily research");
  console.log(`   mode: ${RESEARCH_MODE}`);
  console.log(`   started: ${startedAt}`);
  console.log("");

  const existing = await loadExistingArticles();
  console.log(`📚 loaded ${existing.length} existing articles for dedup`);

  const allRaw: RawItem[] = [];
  for (const src of SOURCES) {
    console.log(`\n🔍 ${src.name}`);
    const items = await fetchRss(googleNewsRss(src.query));
    console.log(`   found ${items.length} items`);
    allRaw.push(...items.map((i) => ({ ...i, source: src.name })));
  }

  // De-dupe against existing + within the new set
  const seen = new Set<string>();
  const unique = allRaw.filter((i) => {
    const key = slugify(i.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  console.log(`\n📋 ${unique.length} unique items after dedup`);

  // Extract via Gemini (sequential to keep RPM reasonable)
  const extracted: ExtractedArticle[] = [];
  for (const raw of unique.slice(0, 12)) {
    const ex = await extractArticle(raw);
    if (ex) extracted.push(ex);
  }
  console.log(`\n✨ extracted ${extracted.length} clean articles`);

  // Dedupe against existing dataset
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
    if (isDuplicate(candidate, [...existing, ...novel])) {
      console.log(`  🔁 dedup: ${candidate.title}`);
      continue;
    }
    novel.push(candidate);
  }
  console.log(`\n🆕 ${novel.length} truly novel articles`);

  if (RESEARCH_MODE === "publish" && novel.length > 0) {
    await appendToArticlesFile(novel);
    await postToTelegram(novel);
    await triggerVercelRedeploy();
  } else if (RESEARCH_MODE === "draft") {
    // Write to a draft file for review
    await mkdir(join(PROJECT_ROOT, "data"), { recursive: true });
    const draftPath = join(PROJECT_ROOT, "data", "research-draft.json");
    await writeFile(draftPath, JSON.stringify(novel, null, 2), "utf-8");
    console.log(`📝 draft written to ${draftPath}`);
  }

  // Log digest
  const digest = {
    startedAt,
    mode: RESEARCH_MODE,
    sources: SOURCES.map((s) => s.name),
    rawItems: allRaw.length,
    unique: unique.length,
    extracted: extracted.length,
    novel: novel.length,
    articles: novel.map((a) => ({ slug: a.slug, title: a.title, source: a.sourceName })),
  };
  await mkdir(join(PROJECT_ROOT, "data"), { recursive: true });
  await writeFile(DIGEST_LOG, JSON.stringify(digest, null, 2), "utf-8");
  console.log(`\n📊 digest logged to ${DIGEST_LOG}`);
  console.log(`\n✅ done.`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
