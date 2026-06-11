"use client";

import { useMemo, useState } from "react";
import { opportunities, getActiveOpportunities, type Opportunity } from "@/data/opportunities";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { Clock, ExternalLink, Sparkles, Award, Briefcase, Filter } from "lucide-react";

const typeLabel: Record<Opportunity["type"], string> = {
  fellowship: "Fellowship",
  grant: "Grant",
  accelerator: "Accelerator",
  job: "Job",
  competition: "Competition",
  scholarship: "Scholarship",
};

const typeIcon: Record<Opportunity["type"], React.ReactNode> = {
  fellowship: <Sparkles className="w-3.5 h-3.5" />,
  grant: <Award className="w-3.5 h-3.5" />,
  accelerator: <Sparkles className="w-3.5 h-3.5" />,
  job: <Briefcase className="w-3.5 h-3.5" />,
  competition: <Award className="w-3.5 h-3.5" />,
  scholarship: <Award className="w-3.5 h-3.5" />,
};

const typeColor: Record<Opportunity["type"], string> = {
  fellowship: "bg-gold/15 text-gold border-gold/30",
  grant: "bg-emerald/15 text-emerald border-emerald/30",
  accelerator: "bg-signal-info/15 text-signal-info border-signal-info/30",
  job: "bg-ink-700 text-ink-200 border-ink-600",
  competition: "bg-ivory/10 text-ivory border-ivory/30",
  scholarship: "bg-emerald/15 text-emerald border-emerald/30",
};

const types: (Opportunity["type"] | "all")[] = [
  "all",
  "fellowship",
  "grant",
  "accelerator",
  "job",
  "competition",
  "scholarship",
];

function daysUntil(iso: string): number | null {
  if (iso === "Rolling") return null;
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function OpportunitiesExplorer() {
  const [type, setType] = useState<Opportunity["type"] | "all">("all");
  const [region, setRegion] = useState<Opportunity["region"] | "all">("all");

  const active = useMemo(() => getActiveOpportunities(), []);
  const featured = active.filter((o) => o.featured);

  const filtered = useMemo(() => {
    return active.filter((o) => {
      if (type !== "all" && o.type !== type) return false;
      if (region !== "all" && o.region !== region) return false;
      return true;
    });
  }, [type, region, active]);

  const regions: (Opportunity["region"] | "all")[] = [
    "all",
    "Pan-Africa",
    "East Africa",
    "West Africa",
    "North Africa",
    "Southern Africa",
    "Global",
  ];

  return (
    <>
      <SectionHeader
        eyebrow="Open · Curated · Updated daily"
        title="The Opportunities Board"
        description="Fellowships, grants, accelerators, jobs, competitions, and scholarships. Hand-picked, deadlines verified."
      />

      {featured.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Editor's picks
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((o) => (
              <OpportunityCard key={o.slug} opp={o} featured />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-4 mb-6 space-y-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-2">Type</div>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors",
                  type === t
                    ? "bg-gold text-midnight border-gold"
                    : "bg-ink-900 text-ink-200 border-ink-700 hover:border-gold/40"
                )}
              >
                {t === "all" ? "All" : typeLabel[t]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-2">Region</div>
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors",
                  region === r
                    ? "bg-gold text-midnight border-gold"
                    : "bg-ink-900 text-ink-200 border-ink-700 hover:border-gold/40"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((o) => (
          <OpportunityCard key={o.slug} opp={o} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-ink-300 text-sm">
            No opportunities match the current filters.
          </div>
        )}
      </div>
    </>
  );
}

function OpportunityCard({ opp: o, featured = false }: { opp: Opportunity; featured?: boolean }) {
  const days = daysUntil(o.deadline);
  const isUrgent = days !== null && days <= 14;

  return (
    <article
      className={cn(
        "group bg-ink-800/40 border rounded-sm p-5 flex flex-col transition-colors",
        featured ? "border-gold/40 hover:border-gold" : "border-ink-700/60 hover:border-gold/40"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm",
            typeColor[o.type]
          )}
        >
          {typeIcon[o.type]}
          {typeLabel[o.type]}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-300 ml-auto">
          {o.region}
        </span>
      </div>

      <h3 className="font-display font-bold text-lg text-ivory leading-tight mb-2 group-hover:text-gold transition-colors">
        {o.title}
      </h3>

      <p className="text-sm text-ink-200 leading-relaxed mb-4 line-clamp-3 flex-1">
        {o.description}
      </p>

      {o.amount && (
        <div className="mb-3 px-3 py-1.5 bg-emerald/10 border border-emerald/30 rounded-sm">
          <div className="text-[10px] font-mono uppercase tracking-widest text-emerald">Award</div>
          <div className="text-sm font-semibold text-ivory">{o.amount}</div>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {o.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono uppercase tracking-wider text-ink-300 bg-ink-900 border border-ink-700/60 px-1.5 py-0.5 rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-ink-700/60">
        <div className="text-[10px] font-mono text-ink-300 truncate">
          {o.org}
        </div>
        <div
          className={cn(
            "text-[10px] font-mono flex items-center gap-1.5 ml-2",
            days === null
              ? "text-emerald"
              : isUrgent
                ? "text-signal-down"
                : "text-ink-300"
          )}
        >
          <Clock className="w-3 h-3" />
          {days === null
            ? "Rolling"
            : days === 0
              ? "Closes today"
              : `${days}d left`}
        </div>
      </div>
    </article>
  );
}
