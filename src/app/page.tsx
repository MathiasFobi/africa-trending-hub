import Link from "next/link";
import { Clock } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ArticleCard } from "@/components/article-card";
import { PulseTicker } from "@/components/pulse-ticker";
import { NewsletterCta } from "@/components/newsletter-cta";
import { StatBlock } from "@/components/stat-block";
import { getFeatured, getTrending, articles } from "@/data/articles";
import type { Article } from "@/data/articles";
import { fundingTrends, sectorBreakdown } from "@/data/startups";
import { categories } from "@/data/site";
import { formatCompact } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const categoryLabel = (slug: string) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

/**
 * Magazine overlay card — Gillion-style: image fills the card, dark gradient,
 * category pill + white headline sit on top of the image.
 */
function OverlayCard({
  article,
  size = "sm",
  className,
}: {
  article: Article;
  size?: "lg" | "sm";
  className?: string;
}) {
  const cat = categoryLabel(article.category);
  const lg = size === "lg";
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-coal block",
        lg ? "min-h-[340px] sm:min-h-[440px] lg:min-h-[580px]" : "min-h-[190px] sm:min-h-[250px]",
        className
      )}
    >
      {article.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.image}
          alt={article.imageCaption ?? article.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3A3220] via-coal to-midnight flex items-center justify-center">
          <span className="font-display text-[110px] font-bold text-white/10 select-none">
            {cat.slice(0, 2)}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className={cn("absolute inset-x-0 bottom-0", lg ? "p-5 sm:p-8" : "p-4 sm:p-5")}>
        <span className="inline-block rounded-full bg-black/45 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-white/10">
          {cat}
        </span>
        <h2
          className={cn(
            "mt-2.5 sm:mt-3 font-extrabold tracking-tight text-white leading-[1.15]",
            lg ? "text-[22px] sm:text-4xl font-display" : "text-[15px] sm:text-[17px]"
          )}
        >
          {article.title}
        </h2>
        {lg && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-white/80">
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gold text-midnight text-xs font-bold flex items-center justify-center">
                {article.author.charAt(0)}
              </span>
              <span className="font-medium text-white">{article.author}</span>
            </span>
            <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readMinutes} min read
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Home() {
  const featured = getFeatured() ?? articles[0];
  const trending = getTrending();
  const heroSide = trending.filter((a) => a.slug !== featured.slug).slice(0, 4);
  const heroSlugs = new Set([featured.slug, ...heroSide.map((a) => a.slug)]);
  const latest = articles.filter((a) => !heroSlugs.has(a.slug)).slice(0, 6);
  const latestSlugs = new Set(latest.map((a) => a.slug));
  const picks = articles
    .filter((a) => !heroSlugs.has(a.slug) && !latestSlugs.has(a.slug))
    .slice(0, 3);

  const latestFunding = fundingTrends[fundingTrends.length - 1];
  const previousFunding = fundingTrends[fundingTrends.length - 2];
  const fundingGrowth = ((latestFunding.total - previousFunding.total) / previousFunding.total) * 100;

  return (
    <>
      {/* The single live bar */}
      <PulseTicker />

      {/* HERO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 pb-2">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          <OverlayCard article={featured} size="lg" className="col-span-2 lg:row-span-2" />
          {heroSide.map((a) => (
            <OverlayCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* THE LATEST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          variant="compact"
          eyebrow="Fresh off the wire"
          title="The Latest"
          ctaLabel="All stories"
          ctaHref="/"
        />
        <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {latest.map((a) => {
            const cat = categoryLabel(a.category);
            return (
              <Link key={a.slug} href={`/article/${a.slug}`} className="w-52 sm:w-60 shrink-0 group">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-cream relative">
                  {a.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.image}
                      alt={a.imageCaption ?? a.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-5xl font-bold text-faint/50 select-none">
                        {cat.slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 font-display italic text-[15px] text-gold-deep">{cat}</div>
                <h4 className="mt-1 font-bold text-[15px] text-coal leading-snug group-hover:text-gold-deep transition-colors">
                  {a.title}
                </h4>
              </Link>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER — slim banner, high on the page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <NewsletterCta variant="banner" />
      </section>

      {/* PULSE STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <SectionHeader
          eyebrow="The Numbers Today"
          title="Africa, by the data."
          ctaLabel="Open the Pulse Dashboard"
          ctaHref="/pulse"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBlock
            label="African VC deployed (Q1 26)"
            value={latestFunding.total}
            unit="usd"
            change={fundingGrowth}
            hint="vs prior quarter"
            emphasis="gold"
          />
          <StatBlock
            label="Active deals tracked"
            value={latestFunding.deals}
            unit="count"
            change={2.4}
            hint="QoQ"
            emphasis="emerald"
          />
          <StatBlock
            label="Unicorns on the continent"
            value={10}
            unit="count"
            change={25}
            hint="YoY"
            emphasis="ivory"
          />
          <StatBlock
            label="Internet penetration"
            value={43.1}
            unit="percent"
            change={3.2}
            hint="vs 2025"
            emphasis="ivory"
          />
        </div>
      </section>

      {/* EDITORS' PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <SectionHeader
          eyebrow="Curated for you"
          title="Editors' picks."
          description="The stories our newsroom can't stop talking about."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {picks.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="feature" />
          ))}
        </div>
      </section>

      {/* FUNDING FLOW */}
      <section className="bg-cream border-y border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="The Capital Flow"
            title="Where the money is going."
            description="Quarterly African venture capital deployment, 2024 – 2026."
            ctaLabel="Open Startup Tracker"
            ctaHref="/startups"
          />
          <div className="bg-card border border-line rounded-2xl p-6 shadow-sm">
            <div className="flex items-end gap-1.5 h-48 mb-2">
              {fundingTrends.map((q) => {
                const max = Math.max(...fundingTrends.map((f) => f.total));
                const h = (q.total / max) * 100;
                return (
                  <div key={q.quarter} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 group">
                    <div className="text-[10px] font-mono text-smoke tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatCompact(q.total)}
                    </div>
                    <div
                      className="w-full bg-gradient-to-t from-gold/70 to-gold rounded-t-md group-hover:from-gold group-hover:to-gold transition-all"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5">
              {fundingTrends.map((q) => (
                <div key={q.quarter} className="flex-1 text-center text-[10px] font-mono text-faint">
                  {q.quarter.replace(" ", "'")}
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {sectorBreakdown.slice(0, 3).map((s) => (
              <div key={s.sector} className="p-4 bg-card border border-line rounded-2xl shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">
                  {s.sector}
                </div>
                <div className="font-extrabold tracking-tight text-2xl text-gold-deep tabular-nums">
                  {formatCompact(s.amount)}
                </div>
                <div className="text-[11px] font-mono text-smoke mt-1">
                  {s.share}% of total deployment
                </div>
                <div className="mt-2 h-1.5 bg-cream rounded-full overflow-hidden">
                  <div className="h-full bg-emerald" style={{ width: `${s.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
