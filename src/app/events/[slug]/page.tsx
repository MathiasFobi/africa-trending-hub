import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { events, getUpcomingEvents } from "@/data/events";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Tag,
} from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) return { title: "Event not found" };
  return {
    title: e.title,
    description: e.description,
    keywords: [e.category, e.city, e.country, e.hostedBy],
    alternates: { canonical: `/events/${e.slug}` },
    openGraph: {
      type: "website",
      title: e.title,
      description: e.description,
      siteName: "AfricaTrendingHub",
    },
    twitter: {
      card: "summary_large_image",
      title: e.title,
      description: e.description,
    },
  };
}

const categoryColor: Record<string, string> = {
  tech: "bg-signal-info/15 text-signal-info border-signal-info/30",
  culture: "bg-gold/15 text-gold border-gold/30",
  music: "bg-emerald/15 text-emerald border-emerald/30",
  business: "bg-ivory/10 text-ivory border-ivory/30",
  politics: "bg-ink-700 text-ink-200 border-ink-600",
  sport: "bg-emerald/15 text-emerald border-emerald/30",
  climate: "bg-signal-up/15 text-signal-up border-signal-up/30",
};

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();

  const start = new Date(e.startDate);
  const end = e.endDate ? new Date(e.endDate) : null;
  const isMultiDay = end && end.getTime() !== start.getTime();
  const durationDays = isMultiDay
    ? Math.ceil((end!.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 1;

  // Related events: same category or country, exclude self
  const related = events
    .filter((x) => x.slug !== e.slug && (x.category === e.category || x.country === e.country))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: e.startDate,
    endDate: e.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.venue,
      address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: e.country },
    },
    organizer: { "@type": "Organization", name: e.hostedBy },
    offers: e.price === "Free" ? { "@type": "Offer", price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock" } : undefined,
  };

  return (
    <article>
      <header className="border-b border-ink-700/60 bg-gradient-to-b from-ink-800/40 to-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-300 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All events
          </Link>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm ${categoryColor[e.category]}`}
                >
                  {e.category}
                </span>
                {e.featured && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-300">
                  {e.price}
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory leading-[1.1] tracking-tight">
                {e.title}
              </h1>
              <p className="mt-5 text-lg text-ink-200 leading-relaxed">{e.description}</p>
            </div>

            {/* Day tile */}
            <div className="lg:col-span-4">
              <div className="bg-ink-800/60 border border-ink-700/60 rounded-sm p-6 text-center">
                <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2">
                  {isMultiDay ? `${durationDays}-day event` : "Single day"}
                </div>
                <div className="text-[11px] font-mono text-ink-300 mb-3">
                  {start.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                </div>
                <div className="font-display font-bold text-7xl text-ivory leading-none">
                  {start.getDate()}
                </div>
                <div className="text-sm font-mono text-ink-300 mt-2">
                  {start.getFullYear()}
                </div>
                {isMultiDay && end && (
                  <div className="mt-4 pt-4 border-t border-ink-700/60 text-[11px] font-mono text-ink-300">
                    through {end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-ink-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {e.venue}, {e.city}, {e.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              {isMultiDay && end && (
                <> – {end.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</>
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display font-bold text-2xl text-ivory">About this event</h2>
            <p className="text-ink-200 leading-relaxed">
              {e.title} is a {e.category} event happening at {e.venue} in {e.city}, {e.country}.
              Hosted by <span className="text-ivory font-semibold">{e.hostedBy}</span>, the event
              {isMultiDay ? ` runs for ${durationDays} days` : " is a single-day gathering"}.
              {e.price === "Free" ? " Admission is free." : ` Admission is in the ${e.price} range.`}
            </p>

            <p className="text-ink-200 leading-relaxed">
              This dispatch is part of AfricaTrendingHub's {e.category} coverage. We track
              conferences, festivals, summits, and convenings across the African continent —
              curated, dates verified, and grouped by category. Add the event to your calendar
              using the link on the right.
            </p>
          </div>

          <aside className="space-y-5">
            <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-5">
              <h3 className="font-display font-bold text-sm text-gold mb-3">Event details</h3>
              <dl className="space-y-3 text-xs font-mono">
                <div>
                  <dt className="text-ink-400 mb-0.5">Host</dt>
                  <dd className="text-ivory">{e.hostedBy}</dd>
                </div>
                <div>
                  <dt className="text-ink-400 mb-0.5">Venue</dt>
                  <dd className="text-ivory">{e.venue}</dd>
                </div>
                <div>
                  <dt className="text-ink-400 mb-0.5">Location</dt>
                  <dd className="text-ivory">
                    {e.city}, {e.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-400 mb-0.5">Price</dt>
                  <dd className="text-ivory">{e.price}</dd>
                </div>
              </dl>
            </div>

            {e.url && (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors"
              >
                Register / get tickets
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-ink-700/60">
            <h2 className="font-display font-bold text-xl text-gold mb-5">Related events</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/events/${r.slug}`}
                  className="group bg-ink-800/40 border border-ink-700/60 hover:border-gold/40 rounded-sm p-4 transition-colors"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1.5">
                    {r.category}
                  </div>
                  <h3 className="font-display font-semibold text-base text-ivory leading-tight group-hover:text-gold transition-colors mb-1.5">
                    {r.title}
                  </h3>
                  <div className="text-[11px] font-mono text-ink-300">
                    {r.city}, {r.country}
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
