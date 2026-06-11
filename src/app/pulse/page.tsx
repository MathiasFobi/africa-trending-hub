import { startups, fundingTrends, sectorBreakdown } from "@/data/startups";
import { articles, getTrending } from "@/data/articles";
import { SectionHeader } from "@/components/section-header";
import { StatBlock } from "@/components/stat-block";
import { ArticleCard } from "@/components/article-card";
import { PulseTicker } from "@/components/pulse-ticker";
import { formatCompact, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export const metadata = {
  title: "Pulse — AfricaTrendingHub",
  description:
    "The live dashboard for African tech, capital, and culture. Funding flows, sector breakdowns, and trending stories updated in real time.",
};

export default function PulsePage() {
  const totalFunding = startups.reduce((s, x) => s + x.totalRaised, 0);
  const unicorns = startups.filter((s) => s.stage === "Unicorn" || s.stage === "Decacorn");
  const latestQuarter = fundingTrends[fundingTrends.length - 1];
  const previousQuarter = fundingTrends[fundingTrends.length - 2];
  const quarterGrowth =
    ((latestQuarter.total - previousQuarter.total) / previousQuarter.total) * 100;
  const totalDeals = fundingTrends.reduce((s, q) => s + q.deals, 0);
  const maxFunding = Math.max(...fundingTrends.map((q) => q.total));
  const trendingArticles = getTrending().slice(0, 4);

  // Top movers
  const topRising = [...startups]
    .filter((s) => s.status === "Rising")
    .sort((a, b) => b.momentum - a.momentum)
    .slice(0, 5);
  const topStruggling = [...startups]
    .filter((s) => s.status === "Struggling" || s.status === "Watchlist")
    .sort((a, b) => a.momentum - b.momentum)
    .slice(0, 3);

  return (
    <>
      <PulseTicker />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <SectionHeader
          eyebrow="Live Dashboard · Synced daily"
          title="The Pulse"
          description="The state of African capital, innovation, and culture — quantified, in motion, right now."
        />

        {/* Top stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatBlock
            label="Tracked capital"
            value={totalFunding}
            unit="usd"
            change={quarterGrowth}
            emphasis="emerald"
          />
          <StatBlock
            label="Latest quarter deals"
            value={latestQuarter.deals}
            unit="count"
            hint={latestQuarter.quarter}
            emphasis="gold"
          />
          <StatBlock
            label="Unicorns tracked"
            value={unicorns.length}
            unit="count"
            hint={unicorns.map((u) => u.name).slice(0, 2).join(", ")}
            emphasis="ivory"
          />
          <StatBlock
            label="Stories live"
            value={articles.length}
            unit="count"
            hint={`${trendingArticles.length} trending now`}
            emphasis="emerald"
          />
        </div>

        {/* Funding trends chart */}
        <div className="mb-10">
          <SectionHeader variant="compact" title="Quarterly funding flow" eyebrow="Trailing 9 quarters" />
          <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-6">
            <div className="flex items-end gap-2 h-48">
              {fundingTrends.map((q, i) => {
                const heightPct = (q.total / maxFunding) * 100;
                const isLatest = i === fundingTrends.length - 1;
                return (
                  <div key={q.quarter} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="bg-midnight border border-gold/40 px-2 py-1 rounded-sm text-[10px] font-mono whitespace-nowrap">
                        <div className="text-ivory font-semibold">{formatCompact(q.total)}</div>
                        <div className="text-ink-300">{q.deals} deals</div>
                      </div>
                    </div>
                    <div
                      className={`w-full rounded-t-sm transition-all ${
                        isLatest
                          ? "bg-gradient-to-t from-gold to-gold/60 group-hover:to-gold"
                          : "bg-ink-600 group-hover:bg-ink-500"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <div
                      className={`text-[10px] font-mono tracking-wider whitespace-nowrap ${
                        isLatest ? "text-gold font-semibold" : "text-ink-400"
                      }`}
                    >
                      {q.quarter.replace(" ", "'")}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-ink-700/60 flex items-center justify-between text-[10px] font-mono text-ink-400">
              <span>Source: AfricaTrendingHub aggregator</span>
              <span className="text-gold">● Latest: {formatCompact(latestQuarter.total)} ({formatPercent(quarterGrowth, 1)} QoQ)</span>
            </div>
          </div>
        </div>

        {/* Two-column: sector breakdown + top movers */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Sector breakdown */}
          <div className="lg:col-span-2">
            <SectionHeader variant="compact" title="Capital by sector" eyebrow="Cumulative" />
            <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-5 space-y-3">
              {sectorBreakdown.map((s) => (
                <div key={s.sector}>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-medium text-ivory">{s.sector}</span>
                    <span className="font-mono text-ink-300">
                      {formatCompact(s.amount)} · {s.share}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-ink-700 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-emerald"
                      style={{ width: `${s.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top movers */}
          <div>
            <SectionHeader variant="compact" title="Top movers" eyebrow="By momentum" />
            <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Rising
              </div>
              <ul className="space-y-2.5 mb-5">
                {topRising.map((s, i) => (
                  <li key={s.slug} className="flex items-center gap-2 text-xs">
                    <span className="text-ink-400 font-mono w-4">{i + 1}</span>
                    <span className="flex-1 truncate text-ivory">{s.name}</span>
                    <span className="font-mono text-emerald">{s.momentum}</span>
                  </li>
                ))}
              </ul>
              {topStruggling.length > 0 && (
                <>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-signal-down mb-3 flex items-center gap-1.5 pt-4 border-t border-ink-700/60">
                    <TrendingDown className="w-3 h-3" /> Watch
                  </div>
                  <ul className="space-y-2.5">
                    {topStruggling.map((s) => (
                      <li key={s.slug} className="flex items-center gap-2 text-xs">
                        <span className="flex-1 truncate text-ink-200">{s.name}</span>
                        <span className="font-mono text-signal-down">{s.momentum}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Trending articles */}
        <div>
          <SectionHeader
            variant="compact"
            title="Trending stories"
            eyebrow="Most-read right now"
            ctaLabel="All stories"
            ctaHref="/category/business"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
