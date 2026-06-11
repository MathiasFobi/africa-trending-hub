import { promises as fs } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowLeft, RefreshCw, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800"] });

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  sourceUrl?: string;
  sourceName?: string;
};

type Digest = {
  startedAt?: string;
  finishedAt?: string;
  mode?: string;
  sources?: string[];
  rawItems?: number;
  unique?: number;
  extracted?: number;
  novel?: number;
  appended?: number;
  articles?: Array<{ slug: string; title: string; source: string }>;
  log?: string[];
  error?: string;
};

const ARTICLES_FILE = join("/tmp", "ath-articles-snapshot.json");
const DIGEST_LOG = join("/tmp", "ath-research-digest.json");

export const dynamic = "force-dynamic";

async function readJson<T>(path: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export default async function AdminPage() {
  const [digest, allArticles] = await Promise.all([
    readJson<Digest>(DIGEST_LOG),
    readJson<Article[]>(ARTICLES_FILE),
  ]);

  const recent = (allArticles ?? []).slice(-12).reverse();
  const cronUrl = "/api/cron/daily-research";

  return (
    <main className="min-h-screen bg-midnight text-ivory font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-300 hover:text-gold mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to site
        </Link>

        <header className="mb-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-gold" />
            Admin
          </div>
          <h1 className={`${playfair.className} text-4xl font-bold text-ivory`}>
            Daily Research Console
          </h1>
          <p className="mt-2 text-ink-200 max-w-2xl">
            Inspect the latest research digest, trigger the pipeline manually, and review the
            articles that have been auto-published.
          </p>
        </header>

        {/* Trigger panel */}
        <section className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display font-bold text-lg text-ivory mb-1 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-gold" />
                Manual trigger
              </h2>
              <p className="text-sm text-ink-300 max-w-xl">
                Hit the cron endpoint manually. The Vercel Cron runs this automatically at{" "}
                <span className="font-mono text-gold">13:00 UTC, Mon–Fri</span> (~8 AM ET). On Vercel
                Hobby, the function timeout is 60s, so we cap Gemini extraction at 8 items per
                run to stay within budget.
              </p>
            </div>
            <a
              href={cronUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors text-sm flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Run now
            </a>
          </div>
          <p className="mt-3 text-[10px] font-mono text-ink-400">
            POST or GET {cronUrl} · expects Authorization: Bearer $CRON_SECRET
          </p>
        </section>

        {/* Latest digest */}
        <section className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-6 mb-6">
          <h2 className="font-display font-bold text-lg text-ivory mb-3">Latest digest</h2>

          {!digest ? (
            <div className="text-sm text-ink-300">
              No digest yet. Trigger the pipeline above to populate.
            </div>
          ) : digest.error ? (
            <div className="text-sm text-signal-down flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{digest.error}</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <Metric label="Raw items" value={digest.rawItems ?? 0} />
                <Metric label="Unique" value={digest.unique ?? 0} />
                <Metric label="Gemini extracted" value={digest.extracted ?? 0} />
                <Metric
                  label="Appended"
                  value={digest.appended ?? 0}
                  highlight
                />
              </div>
              <div className="text-[11px] font-mono text-ink-400 mb-3">
                {digest.startedAt && new Date(digest.startedAt).toLocaleString("en-US")} →{" "}
                {digest.finishedAt && new Date(digest.finishedAt).toLocaleString("en-US")} ·{" "}
                {digest.sources?.join(", ")}
              </div>
              {digest.articles && digest.articles.length > 0 && (
                <div className="border-t border-ink-700/60 pt-3 mt-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-2">
                    Last published
                  </div>
                  <ul className="space-y-1.5">
                    {digest.articles.map((a) => (
                      <li
                        key={a.slug}
                        className="text-sm text-ivory flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="truncate">{a.title}</div>
                          <div className="text-[10px] font-mono text-ink-400">
                            {a.source}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {digest.log && digest.log.length > 0 && (
                <details className="mt-4">
                  <summary className="text-[10px] font-mono uppercase tracking-widest text-ink-400 cursor-pointer hover:text-gold">
                    Pipeline log ({digest.log.length} lines)
                  </summary>
                  <pre className="mt-2 p-3 bg-ink-900 border border-ink-700 rounded-sm text-[10px] font-mono text-ink-200 overflow-x-auto">
                    {digest.log.join("\n")}
                  </pre>
                </details>
              )}
            </>
          )}
        </section>

        {/* Recent articles in storage */}
        <section className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-6">
          <h2 className="font-display font-bold text-lg text-ivory mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold" />
            Recent appends ({recent.length} of {allArticles?.length ?? 0})
          </h2>
          {recent.length === 0 ? (
            <div className="text-sm text-ink-300">No articles in storage yet.</div>
          ) : (
            <ul className="space-y-2.5">
              {recent.map((a) => (
                <li
                  key={a.slug}
                  className="flex items-start gap-3 pb-2.5 border-b border-ink-700/40 last:border-0"
                >
                  <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-gold mt-1">
                    {a.category}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ivory">{a.title}</div>
                    <div className="text-[10px] font-mono text-ink-400 mt-0.5">
                      {a.author} · {a.sourceName ?? "internal"} ·{" "}
                      {new Date(a.publishedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="border border-ink-700/60 rounded-sm p-3">
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div
        className={`font-display font-bold text-2xl tabular-nums ${highlight ? "text-gold" : "text-ivory"}`}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}
