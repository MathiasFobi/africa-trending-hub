import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { startups, fundingTrends } from "@/data/startups";
import { articles } from "@/data/articles";
import { formatCompact, formatNumber } from "@/lib/utils";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  DollarSign,
  Tag,
  ExternalLink,
} from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return startups.map((s) => ({ slug: s.slug }));
}

const SITE_URL = "https://africa-trending-hub.vercel.app";

function ogUrl(params: { kind: string; title: string; subtitle?: string; eyebrow?: string }): string {
  const sp = new URLSearchParams({ kind: params.kind, title: params.title });
  if (params.subtitle) sp.set("subtitle", params.subtitle);
  if (params.eyebrow) sp.set("eyebrow", params.eyebrow);
  return `${SITE_URL}/opengraph-image?${sp.toString()}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = startups.find((x) => x.slug === slug);
  if (!s) return { title: "Startup not found" };
  const ogImage = ogUrl({
    kind: "Startup",
    title: s.name,
    subtitle: s.description,
    eyebrow: `${s.sector} · ${s.stage} · ${s.hq}`,
  });
  return {
    title: `${s.name} — ${s.sector}`,
    description: s.description,
    keywords: [s.name, s.sector, s.country, ...s.tags],
    alternates: { canonical: `/startups/${s.slug}` },
    openGraph: {
      type: "article",
      title: `${s.name} — ${s.sector} (${s.stage})`,
      description: s.description,
      siteName: "AfricaTrendingHub",
      images: [{ url: ogImage, width: 1200, height: 630, alt: s.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.name,
      description: s.description,
      images: [ogImage],
    },
  };
}

const statusColor: Record<string, string> = {
  Rising: "bg-emerald/15 text-emerald border-emerald/30",
  Watchlist: "bg-gold/15 text-gold border-gold/30",
  Steady: "bg-ink-700 text-ink-200 border-ink-600",
  Struggling: "bg-signal-down/15 text-signal-down border-signal-down/30",
  Acquired: "bg-ink-700 text-ink-300 border-ink-600",
  Public: "bg-signal-info/15 text-signal-info border-signal-info/30",
};

export default async function StartupPage({ params }: { params: Params }) {
  const { slug } = await params;
  const s = startups.find((x) => x.slug === slug);
  if (!s) notFound();

  const totalSectorRaised = startups
    .filter((x) => x.sector === s.sector)
    .reduce((sum, x) => sum + x.totalRaised, 0);
  const rankByRaised =
    startups
      .slice()
      .sort((a, b) => b.totalRaised - a.totalRaised)
      .findIndex((x) => x.slug === s.slug) + 1;
  const rankByMomentum =
    startups
      .slice()
      .sort((a, b) => b.momentum - a.momentum)
      .findIndex((x) => x.slug === s.slug) + 1;
  const MomentumIcon =
    s.momentum >= 75 ? TrendingUp : s.momentum >= 50 ? Minus : TrendingDown;
  const momentumColor =
    s.momentum >= 75
      ? "text-emerald"
      : s.momentum >= 50
        ? "text-ink-300"
        : "text-signal-down";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.name,
    description: s.description,
    foundingDate: String(s.founded),
    address: { "@type": "PostalAddress", addressLocality: s.city, addressCountry: s.country },
    numberOfEmployees: undefined, // not in fixture
    sameAs: [],
    knowsAbout: s.tags,
  };

  return (
    <article>
      {/* Hero */}
      <header className="border-b border-ink-700/60 bg-gradient-to-b from-ink-800/40 to-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/startups"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-300 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All startups
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-ink-700 flex items-center justify-center shrink-0">
              <Building2 className="w-9 h-9 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm ${statusColor[s.status]}`}
                >
                  {s.status}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                  {s.stage}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-300">
                  {s.sector}
                </span>
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[1.05] tracking-tight">
                {s.name}
              </h1>
              <p className="mt-3 text-lg text-ink-200 leading-relaxed">{s.description}</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-ink-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {s.hq}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Founded {s.founded}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              Last round {new Date(s.lastRoundDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatTile label="Total raised" value={formatCompact(s.totalRaised)} sub={`Rank #${rankByRaised} of ${startups.length}`} />
          <StatTile label="Last round" value={formatCompact(s.lastRound)} sub={new Date(s.lastRoundDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} />
          <StatTile
            label="Momentum"
            value={`${s.momentum}/100`}
            sub={s.momentum >= 75 ? "Strong tailwinds" : s.momentum >= 50 ? "Steady" : "Headwinds"}
            icon={<MomentumIcon className={`w-4 h-4 ${momentumColor}`} />}
          />
          <StatTile
            label="Rank by momentum"
            value={`#${rankByMomentum}`}
            sub={`of ${startups.length} tracked`}
          />
        </div>

        {/* Investors */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-2xl text-ivory mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" />
            Investors
          </h2>
          <div className="flex flex-wrap gap-2">
            {s.investors.map((inv) => (
              <span
                key={inv}
                className="px-3 py-1.5 text-sm font-mono text-ivory bg-ink-800 border border-ink-700 rounded-sm"
              >
                {inv}
              </span>
            ))}
          </div>
        </section>

        {/* Sector context */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-2xl text-ivory mb-4">Sector context</h2>
          <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">
                  {s.sector} · Total raised
                </div>
                <div className="font-display font-bold text-2xl text-ivory">
                  {formatCompact(totalSectorRaised)}
                </div>
                <div className="text-xs text-ink-300 mt-1">
                  {startups.filter((x) => x.sector === s.sector).length} companies in this sector
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">
                  {s.country} · Capital deployed
                </div>
                <div className="font-display font-bold text-2xl text-ivory">
                  {formatCompact(
                    startups
                      .filter((x) => x.country === s.country)
                      .reduce((sum, x) => sum + x.totalRaised, 0)
                  )}
                </div>
                <div className="text-xs text-ink-300 mt-1">
                  {startups.filter((x) => x.country === s.country).length} companies tracked in {s.country}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        {s.tags.length > 0 && (
          <section className="mb-10">
            <h2 className="font-display font-bold text-2xl text-ivory mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-gold" />
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-ink-200 bg-ink-900 border border-ink-700/60 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Market context */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-2xl text-ivory mb-4">Market context</h2>
          <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-5">
            <p className="text-sm text-ink-200 leading-relaxed mb-4">
              {s.name} operates in the <span className="text-ivory font-semibold">{s.sector}</span>{" "}
              vertical, headquartered in <span className="text-ivory font-semibold">{s.hq}</span>.
              As of {new Date(s.lastRoundDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })},
              the company has closed its last round at <span className="text-ivory font-semibold">{formatCompact(s.lastRound)}</span>,
              bringing total capital raised to <span className="text-ivory font-semibold">{formatCompact(s.totalRaised)}</span>.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {fundingTrends.slice(-9).map((q) => (
                <div
                  key={q.quarter}
                  className="h-12 rounded-sm bg-gradient-to-t from-gold/20 to-gold/60 border border-ink-700/60 flex items-end justify-center text-[9px] font-mono text-ink-300 pb-1"
                  style={{ height: `${(q.total / 3_100_000_000) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-2 text-[10px] font-mono text-ink-400 text-center">
              Trailing 9 quarters of African VC funding flow
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

function StatTile({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1.5 flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className="font-display font-bold text-2xl text-ivory">{value}</div>
      {sub && <div className="text-[11px] font-mono text-ink-400 mt-1">{sub}</div>}
    </div>
  );
}
