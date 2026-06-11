import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  Radio,
  BarChart3,
  Map,
  Briefcase,
  GraduationCap,
  Coins,
  Globe2,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ArticleCard } from "@/components/article-card";
import { PulseTicker } from "@/components/pulse-ticker";
import { NewsletterCta } from "@/components/newsletter-cta";
import { StatBlock } from "@/components/stat-block";
import { getFeatured, getTrending, articles, getByCategory } from "@/data/articles";
import { startups, fundingTrends, sectorBreakdown } from "@/data/startups";
import { categories } from "@/data/site";
import { formatCompact } from "@/lib/utils";

export default function Home() {
  const featured = getFeatured() ?? articles[0];
  const trending = getTrending();
  const business = getByCategory("business").slice(0, 3);
  const culture = getByCategory("culture").slice(0, 3);
  const innovation = getByCategory("innovation").slice(0, 3);
  const music = getByCategory("music").slice(0, 3);
  const sports = getByCategory("sports").slice(0, 3);
  const politics = getByCategory("politics").slice(0, 3);

  const totalFunding = startups.reduce((sum, s) => sum + s.totalRaised, 0);
  const latestFunding = fundingTrends[fundingTrends.length - 1];
  const previousFunding = fundingTrends[fundingTrends.length - 2];
  const fundingGrowth = ((latestFunding.total - previousFunding.total) / previousFunding.total) * 100;

  return (
    <>
      <PulseTicker />

      {/* HERO */}
      <section className="relative bg-midnight border-b border-ink-700/60 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-14">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionHeader
                variant="hero"
                eyebrow="Wednesday · June 10, 2026 · Issue 184"
                title="Tracking the Pulse of a Rising Continent."
                description="Real-time data, in-depth reporting, and the stories shaping Africa today — across business, culture, innovation, sports, politics, and music."
                ctaLabel="Get the Daily Pulse"
                ctaHref="#newsletter"
              />

              <div className="mt-10 flex items-center gap-6 text-xs font-mono text-ink-300">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald" />
                  <span>Live data from 12 exchanges</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-gold" />
                  <span>Coverage across 54 countries</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                Live Pulse · Top stories now
              </div>
              <div className="bg-ink-800/50 border border-ink-700/60 rounded-sm divide-y divide-ink-700/60">
                {trending.slice(0, 4).map((a, i) => (
                  <Link
                    key={a.slug}
                    href={`/article/${a.slug}`}
                    className="flex items-start gap-3 p-3.5 hover:bg-ink-700/30 transition-colors group"
                  >
                    <div className="shrink-0 font-display font-bold text-2xl text-gold tabular-nums leading-none w-7">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-sm text-ivory leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                        {a.title}
                      </h3>
                      <div className="mt-1 text-[10px] font-mono text-ink-400">
                        {a.category.toUpperCase()} · {a.readMinutes} min
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED + SECONDARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ArticleCard article={featured} variant="hero" />
          </div>
          <div className="space-y-3">
            {trending.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} variant="list" />
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS — Startup Tracker, Events, Opportunities, Pulse */}
      <section className="bg-ink-900/50 border-y border-ink-700/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="The Intelligence Layer"
            title="Four products. One network."
            description="Beyond the headlines, we run the live infrastructure that helps you see, track, and act on what matters in African markets."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PillarCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Startup Tracker"
              description="Funding rounds, unicorns, momentum scores, and sector flows. Live."
              href="/startups"
              stat={formatCompact(totalFunding)}
              statLabel="tracked capital"
            />
            <PillarCard
              icon={<Map className="w-5 h-5" />}
              title="Events Map"
              description="Conferences, summits, festivals across 50+ African cities."
              href="/events"
              stat="240+"
              statLabel="upcoming events"
            />
            <PillarCard
              icon={<Briefcase className="w-5 h-5" />}
              title="Opportunity Board"
              description="Jobs, scholarships, grants, accelerators — curated daily."
              href="/opportunities"
              stat="1,200+"
              statLabel="active listings"
            />
            <PillarCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="Pulse Dashboard"
              description="Currencies, equities, internet trends, funding flows."
              href="/pulse"
              stat="42"
              statLabel="live metrics"
            />
          </div>
        </div>
      </section>

      {/* PULSE STATS — big numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
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

      {/* BUSINESS + FINTECH */}
      <Section
        title="Business & Fintech"
        description="Capital, commerce, and the operators rewriting African finance."
        link="/category/business"
        articles={business}
        accent="emerald"
      />

      {/* CULTURE + MUSIC — split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader
              eyebrow="Culture"
              title="Where the story begins."
              ctaLabel="More culture"
              ctaHref="/category/culture"
              variant="compact"
            />
            <div className="space-y-1">
              {culture.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Music"
              title="Sound of a continent."
              ctaLabel="More music"
              ctaHref="/category/music"
              variant="compact"
            />
            <div className="space-y-1">
              {music.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INNOVATION */}
      <Section
        title="Innovation"
        description="AI, climate, mobility, and the deep tech emerging from African labs."
        link="/category/innovation"
        articles={innovation}
        accent="ivory"
      />

      {/* FUNDING FLOW */}
      <section className="bg-ink-900/50 border-y border-ink-700/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="The Capital Flow"
            title="Where the money is going."
            description="Quarterly African venture capital deployment, 2024 – 2026."
            ctaLabel="Open Startup Tracker"
            ctaHref="/startups"
          />
          <div className="bg-ink-800/50 border border-ink-700/60 rounded-sm p-6">
            <div className="flex items-end gap-1.5 h-48 mb-2">
              {fundingTrends.map((q, i) => {
                const max = Math.max(...fundingTrends.map((f) => f.total));
                const h = (q.total / max) * 100;
                return (
                  <div key={q.quarter} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 group">
                    <div className="text-[10px] font-mono text-ink-300 tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatCompact(q.total)}
                    </div>
                    <div
                      className="w-full bg-gradient-to-t from-gold/60 to-gold rounded-t-sm hover:from-gold hover:to-gold transition-all"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5">
              {fundingTrends.map((q) => (
                <div key={q.quarter} className="flex-1 text-center text-[10px] font-mono text-ink-400">
                  {q.quarter.replace(" ", "'")}
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {sectorBreakdown.slice(0, 3).map((s) => (
              <div key={s.sector} className="p-4 bg-ink-800/50 border border-ink-700/60 rounded-sm">
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">
                  {s.sector}
                </div>
                <div className="font-display font-bold text-2xl text-gold tabular-nums">
                  {formatCompact(s.amount)}
                </div>
                <div className="text-[11px] font-mono text-ink-300 mt-1">
                  {s.share}% of total deployment
                </div>
                <div className="mt-2 h-1.5 bg-ink-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald" style={{ width: `${s.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS + POLITICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader
              eyebrow="Sports"
              title="The games, the business."
              ctaLabel="More sports"
              ctaHref="/category/sports"
              variant="compact"
            />
            <div className="space-y-1">
              {sports.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Politics"
              title="Policy, power, the continent."
              ctaLabel="More politics"
              ctaHref="/category/politics"
              variant="compact"
            />
            <div className="space-y-1">
              {politics.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <NewsletterCta />
      </section>

      {/* SPOTLIGHT STARTUPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeader
          eyebrow="The Watchlist"
          title="Startups on the rise."
          description="The momentum leaders — founders and companies shaping the next chapter."
          ctaLabel="Open Startup Tracker"
          ctaHref="/startups"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups
            .filter((s) => s.status === "Rising")
            .slice(0, 6)
            .map((s) => (
              <Link
                key={s.slug}
                href="/startups"
                className="block p-5 bg-ink-800/50 border border-ink-700/60 rounded-sm hover:border-gold/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gold">
                    {s.sector}
                  </div>
                  <div className="text-[10px] font-mono text-emerald flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {s.momentum}
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-ivory group-hover:text-gold transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs font-mono text-ink-400 mt-1">
                  {s.hq} · {s.stage}
                </p>
                <p className="text-sm text-ink-300 mt-3 line-clamp-2">{s.description}</p>
                <div className="mt-3 pt-3 border-t border-ink-700/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-ink-400">Raised</span>
                  <span className="text-ivory font-semibold">{formatCompact(s.totalRaised)}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeader eyebrow="Coverage" title="Every angle. One network." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group p-5 bg-ink-800/50 border border-ink-700/60 rounded-sm hover:border-gold/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-gold">
                  {c.label}
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-sm text-ink-200">{c.accent}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function PillarCard({
  icon,
  title,
  description,
  href,
  stat,
  statLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  stat: string;
  statLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-ink-800/50 border border-ink-700/60 rounded-sm hover:border-gold/40 transition-colors"
    >
      <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-midnight transition-colors">
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg text-ivory group-hover:text-gold transition-colors">
        {title}
      </h3>
      <p className="text-sm text-ink-300 mt-2 leading-relaxed">{description}</p>
      <div className="mt-4 pt-4 border-t border-ink-700/60 flex items-baseline gap-2">
        <span className="font-display font-bold text-2xl text-ivory tabular-nums">{stat}</span>
        <span className="text-[11px] font-mono text-ink-400">{statLabel}</span>
      </div>
    </Link>
  );
}

function Section({
  title,
  description,
  link,
  articles,
  accent,
}: {
  title: string;
  description: string;
  link: string;
  articles: ReturnType<typeof getByCategory>;
  accent: "emerald" | "gold" | "ivory";
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        eyebrow="Coverage"
        title={title}
        description={description}
        ctaLabel="See all"
        ctaHref={link}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="feature" />
        ))}
      </div>
    </section>
  );
}
