import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { opportunities, getActiveOpportunities } from "@/data/opportunities";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Award,
  Sparkles,
  Briefcase,
  GraduationCap,
  Calendar,
  Globe,
  Tag,
} from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return opportunities.map((o) => ({ slug: o.slug }));
}

const SITE_URL = "https://africa-trending-hub.vercel.app";

function ogUrl(params: { kind: string; title: string; subtitle?: string; eyebrow?: string }): string {
  const sp = new URLSearchParams({ kind: params.kind, title: params.title });
  if (params.subtitle) sp.set("subtitle", params.subtitle);
  if (params.eyebrow) sp.set("eyebrow", params.eyebrow);
  return `${SITE_URL}/api/og?${sp.toString()}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const o = opportunities.find((x) => x.slug === slug);
  if (!o) return { title: "Opportunity not found" };
  const ogImage = ogUrl({
    kind: o.type,
    title: o.title,
    subtitle: o.description,
    eyebrow: `${o.type.toUpperCase()} · ${o.org} · ${o.region}`,
  });
  return {
    title: o.title,
    description: o.description,
    keywords: [o.type, o.region, o.org, ...o.tags],
    alternates: { canonical: `/opportunities/${o.slug}` },
    openGraph: {
      type: "website",
      title: o.title,
      description: o.description,
      siteName: "AfricaTrendingHub",
      images: [{ url: ogImage, width: 1200, height: 630, alt: o.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      images: [ogImage],
    },
  };
}

const typeColor: Record<string, string> = {
  fellowship: "bg-gold/15 text-gold border-gold/30",
  grant: "bg-emerald/15 text-emerald border-emerald/30",
  accelerator: "bg-signal-info/15 text-signal-info border-signal-info/30",
  job: "bg-ink-700 text-ink-200 border-ink-600",
  competition: "bg-ivory/10 text-ivory border-ivory/30",
  scholarship: "bg-emerald/15 text-emerald border-emerald/30",
};

const typeIcon: Record<string, React.ReactNode> = {
  fellowship: <Sparkles className="w-3.5 h-3.5" />,
  grant: <Award className="w-3.5 h-3.5" />,
  accelerator: <Sparkles className="w-3.5 h-3.5" />,
  job: <Briefcase className="w-3.5 h-3.5" />,
  competition: <Award className="w-3.5 h-3.5" />,
  scholarship: <GraduationCap className="w-3.5 h-3.5" />,
};

function daysUntil(iso: string): number | null {
  if (iso === "Rolling") return null;
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export default async function OpportunityPage({ params }: { params: Params }) {
  const { slug } = await params;
  const o = opportunities.find((x) => x.slug === slug);
  if (!o) notFound();

  const days = daysUntil(o.deadline);
  const isUrgent = days !== null && days <= 14;

  // Related: same type or region
  const related = opportunities
    .filter((x) => x.slug !== o.slug && (x.type === o.type || x.region === o.region))
    .slice(0, 3);

  return (
    <article>
      <header className="border-b border-ink-700/60 bg-gradient-to-b from-ink-800/40 to-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-300 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All opportunities
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm ${typeColor[o.type]}`}
            >
              {typeIcon[o.type]}
              {o.type}
            </span>
            {o.featured && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Editor's pick
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory leading-[1.1] tracking-tight">
            {o.title}
          </h1>
          <p className="mt-3 text-lg text-ink-200">
            <span className="text-ivory font-semibold">{o.org}</span> · {o.region}
          </p>
          <p className="mt-5 text-lg text-ink-200 leading-relaxed">{o.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-ink-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {o.deadline === "Rolling"
                ? "Rolling applications"
                : `Closes ${new Date(o.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
            </span>
            {days !== null && (
              <span
                className={`flex items-center gap-1.5 ${
                  isUrgent ? "text-signal-down font-semibold" : "text-ink-300"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {days === 0 ? "Closes today" : `${days} day${days === 1 ? "" : "s"} left`}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {o.region}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display font-bold text-2xl text-ivory">About this opportunity</h2>
            <p className="text-ink-200 leading-relaxed">
              {o.title} is a <span className="text-ivory font-semibold">{o.type}</span> offered
              by <span className="text-ivory font-semibold">{o.org}</span>, covering the
              <span className="text-ivory font-semibold"> {o.region}</span> region.
              {o.amount && (
                <>
                  {" "}The award is <span className="text-ivory font-semibold">{o.amount}</span>.
                </>
              )}
              {o.deadline === "Rolling" ? (
                <> Applications are accepted on a rolling basis.</>
              ) : (
                <>
                  {" "}Applications close on{" "}
                  <span className="text-ivory font-semibold">
                    {new Date(o.deadline).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  .
                </>
              )}
            </p>

            <p className="text-ink-200 leading-relaxed">
              This opportunity is part of AfricaTrendingHub's curated board of {o.type} listings
              across the African continent. We verify deadlines, amounts, and eligibility before
              publishing. Apply early when possible — most programs review applications on a
              rolling basis.
            </p>

            {o.tags.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-base text-ivory mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {o.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-ink-200 bg-ink-900 border border-ink-700/60 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            {o.amount && (
              <div className="bg-emerald/10 border border-emerald/30 rounded-sm p-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald mb-1.5">
                  Award
                </div>
                <div className="font-display font-bold text-2xl text-ivory">{o.amount}</div>
              </div>
            )}

            <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-5">
              <h3 className="font-display font-bold text-sm text-gold mb-3">Quick facts</h3>
              <dl className="space-y-3 text-xs font-mono">
                <div>
                  <dt className="text-ink-400 mb-0.5">Type</dt>
                  <dd className="text-ivory capitalize">{o.type}</dd>
                </div>
                <div>
                  <dt className="text-ink-400 mb-0.5">Region</dt>
                  <dd className="text-ivory">{o.region}</dd>
                </div>
                <div>
                  <dt className="text-ink-400 mb-0.5">Organization</dt>
                  <dd className="text-ivory">{o.org}</dd>
                </div>
                <div>
                  <dt className="text-ink-400 mb-0.5">Deadline</dt>
                  <dd className="text-ivory">
                    {o.deadline === "Rolling"
                      ? "Rolling"
                      : new Date(o.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                  </dd>
                </div>
              </dl>
            </div>

            {o.url && (
              <a
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors"
              >
                Apply now
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-ink-700/60">
            <h2 className="font-display font-bold text-xl text-gold mb-5">Related opportunities</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/opportunities/${r.slug}`}
                  className="group bg-ink-800/40 border border-ink-700/60 hover:border-gold/40 rounded-sm p-4 transition-colors"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1.5">
                    {r.type}
                  </div>
                  <h3 className="font-display font-semibold text-base text-ivory leading-tight group-hover:text-gold transition-colors mb-1.5">
                    {r.title}
                  </h3>
                  <div className="text-[11px] font-mono text-ink-300">
                    {r.org} · {r.region}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
