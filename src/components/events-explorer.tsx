"use client";

import { useMemo, useState } from "react";
import { events, getUpcomingEvents, type EventItem } from "@/data/events";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";

const categoryColor: Record<EventItem["category"], string> = {
  tech: "bg-signal-info/15 text-signal-info border-signal-info/30",
  culture: "bg-gold/15 text-gold border-gold/30",
  music: "bg-emerald/15 text-emerald border-emerald/30",
  business: "bg-ivory/10 text-ivory border-ivory/30",
  politics: "bg-ink-700 text-ink-200 border-ink-600",
  sport: "bg-emerald/15 text-emerald border-emerald/30",
  climate: "bg-signal-up/15 text-signal-up border-signal-up/30",
};

const categories: (EventItem["category"] | "all")[] = [
  "all",
  "tech",
  "culture",
  "music",
  "business",
  "politics",
  "sport",
  "climate",
];

export function EventsExplorer() {
  const [cat, setCat] = useState<EventItem["category"] | "all">("all");
  const upcoming = useMemo(() => getUpcomingEvents(), []);
  const featured = upcoming.filter((e) => e.featured);

  const filtered = useMemo(() => {
    return upcoming.filter((e) => cat === "all" || e.category === cat);
  }, [cat, upcoming]);

  return (
    <>
      <SectionHeader
        eyebrow="Calendar · 90-day rolling window"
        title="The Events Calendar"
        description="Conferences, festivals, summits, and convenings across the African continent. Curated, dates verified, and grouped by category."
      />

      {/* Featured row */}
      {featured.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Featured this season
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((e) => (
              <EventCard key={e.slug} event={e} featured />
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors",
              cat === c
                ? "bg-gold text-midnight border-gold"
                : "bg-ink-800/40 text-ink-200 border-ink-700/60 hover:border-gold/40"
            )}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      {/* Date-grouped list */}
      <div className="space-y-8">
        {Object.entries(groupByMonth(filtered)).map(([month, items]) => (
          <div key={month}>
            <h3 className="font-display font-bold text-lg text-gold mb-3 sticky top-0 bg-midnight/95 backdrop-blur py-2 z-10">
              {month}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-ink-300 text-sm">
            No events match the current filter.
          </div>
        )}
      </div>
    </>
  );
}

function groupByMonth(items: EventItem[]): Record<string, EventItem[]> {
  const groups: Record<string, EventItem[]> = {};
  for (const e of items) {
    const d = new Date(e.startDate);
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  }
  return groups;
}

function EventCard({ event: e, featured = false }: { event: EventItem; featured?: boolean }) {
  const d = new Date(e.startDate);
  const day = d.getDate();
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const isMultiDay = e.endDate && new Date(e.endDate).getTime() !== d.getTime();
  const daysText = isMultiDay
    ? `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(e.endDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    : d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <article
      className={cn(
        "group bg-ink-800/40 border rounded-sm p-4 transition-colors",
        featured ? "border-gold/40 hover:border-gold" : "border-ink-700/60 hover:border-gold/40"
      )}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            "shrink-0 w-14 h-14 rounded-sm flex flex-col items-center justify-center border",
            featured ? "bg-gold/10 border-gold/40" : "bg-ink-900 border-ink-700"
          )}
        >
          <div className="text-[9px] font-mono tracking-widest text-gold">{month}</div>
          <div className="font-display font-bold text-2xl text-ivory leading-none">{day}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 border rounded-sm",
                categoryColor[e.category]
              )}
            >
              {e.category}
            </span>
            <span className="text-[10px] font-mono text-ink-400">{e.price}</span>
          </div>
          <h3 className="font-display font-bold text-base text-ivory leading-tight mb-1 group-hover:text-gold transition-colors">
            {e.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-ink-300 mb-2">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">
              {e.city}, {e.country}
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-ink-200 leading-relaxed mt-2 line-clamp-2">{e.description}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-700/60 text-[10px] font-mono text-ink-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          {daysText}
        </span>
        <span className="truncate ml-2 text-ink-300">{e.hostedBy}</span>
      </div>
    </article>
  );
}
