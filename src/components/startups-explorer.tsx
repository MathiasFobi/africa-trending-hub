"use client";

import { useMemo, useState } from "react";
import { startups, type Startup } from "@/data/startups";
import { SectionHeader } from "@/components/section-header";
import { cn, formatCompact, formatNumber } from "@/lib/utils";
import { Building2, MapPin, TrendingUp, TrendingDown, Minus, Search, Filter } from "lucide-react";

type Sort = "momentum" | "raised" | "name" | "recent";

const statusColor: Record<Startup["status"], string> = {
  Rising: "bg-emerald/15 text-emerald border-emerald/30",
  Watchlist: "bg-gold/15 text-gold border-gold/30",
  Steady: "bg-ink-700 text-ink-200 border-ink-600",
  Struggling: "bg-signal-down/15 text-signal-down border-signal-down/30",
  Acquired: "bg-ink-700 text-ink-300 border-ink-600",
  Public: "bg-signal-info/15 text-signal-info border-signal-info/30",
};

const stageColor: Record<Startup["stage"], string> = {
  "Pre-seed": "text-ink-300",
  Seed: "text-ink-200",
  "Series A": "text-ivory",
  "Series B": "text-ivory",
  "Series C": "text-ivory",
  "Series D": "text-ivory",
  "Series E": "text-ivory",
  "Series C+": "text-gold",
  Unicorn: "text-gold font-semibold",
  Decacorn: "text-gold font-bold",
};

export function StartupsExplorer() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("all");
  const [stage, setStage] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("momentum");

  const sectors = useMemo(() => {
    const set = new Set(startups.map((s) => s.sector));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const stages = useMemo(() => {
    const set = new Set(startups.map((s) => s.stage));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const out = startups
      .filter((s) => {
        if (sector !== "all" && s.sector !== sector) return false;
        if (stage !== "all" && s.stage !== stage) return false;
        if (status !== "all" && s.status !== status) return false;
        if (query) {
          const q = query.toLowerCase();
          const haystack = `${s.name} ${s.country} ${s.city} ${s.sector} ${s.description} ${s.tags.join(" ")}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "momentum":
            return b.momentum - a.momentum;
          case "raised":
            return b.totalRaised - a.totalRaised;
          case "name":
            return a.name.localeCompare(b.name);
          case "recent":
            return new Date(b.lastRoundDate).getTime() - new Date(a.lastRoundDate).getTime();
        }
      });
    return out;
  }, [query, sector, stage, status, sort]);

  const totalRaised = filtered.reduce((s, x) => s + x.totalRaised, 0);
  const avgMomentum = filtered.length
    ? Math.round(filtered.reduce((s, x) => s + x.momentum, 0) / filtered.length)
    : 0;

  return (
    <>
      <SectionHeader
        eyebrow="Live Tracker · Updated daily"
        title="The Startup Intelligence Layer"
        description="Real-time funding, momentum, and operator data on the companies building Africa's future. Filter, sort, and dig in."
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatPill label="Companies tracked" value={formatNumber(filtered.length)} />
        <StatPill label="Total raised" value={formatCompact(totalRaised)} />
        <StatPill label="Avg. momentum" value={`${avgMomentum}/100`} />
        <StatPill label="Showing" value={`${filtered.length} / ${startups.length}`} />
      </div>

      {/* Filter bar */}
      <div className="bg-ink-800/40 border border-ink-700/60 rounded-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search by name, country, sector, tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-ink-900 border border-ink-700 rounded-sm text-sm text-ivory placeholder:text-ink-400 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select label="Sector" value={sector} onChange={setSector} options={sectors} />
            <Select label="Stage" value={stage} onChange={setStage} options={stages} />
            <Select
              label="Status"
              value={status}
              onChange={setStatus}
              options={["all", "Rising", "Watchlist", "Steady", "Struggling", "Acquired", "Public"]}
            />
            <Select
              label="Sort"
              value={sort}
              onChange={(v) => setSort(v as Sort)}
              options={["momentum", "raised", "recent", "name"]}
              formatLabel={(v) =>
                v === "momentum"
                  ? "Momentum"
                  : v === "raised"
                    ? "Total raised"
                    : v === "recent"
                      ? "Most recent"
                      : "Name (A–Z)"
              }
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <StartupCard key={s.slug} startup={s} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-ink-300 text-sm">
            No startups match the current filters. Try widening your search.
          </div>
        )}
      </div>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  formatLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  formatLabel?: (v: string) => string;
}) {
  const display = (v: string) => (formatLabel ? formatLabel(v) : v === "all" ? `All ${label.toLowerCase()}` : v);
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-8 pr-7 py-2 bg-ink-900 border border-ink-700 rounded-sm text-sm text-ivory focus:border-gold focus:outline-none transition-colors cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {display(o)}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ink-700/60 rounded-sm p-3">
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div className="font-display font-bold text-xl text-ivory">{value}</div>
    </div>
  );
}

function StartupCard({ startup: s }: { startup: Startup }) {
  const MomentumIcon =
    s.momentum >= 75 ? TrendingUp : s.momentum >= 50 ? Minus : TrendingDown;
  const momentumColor =
    s.momentum >= 75
      ? "text-emerald"
      : s.momentum >= 50
        ? "text-ink-300"
        : "text-signal-down";

  return (
    <article className="group bg-ink-800/40 border border-ink-700/60 hover:border-gold/40 rounded-sm p-5 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-sm bg-ink-700 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-gold" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-lg text-ivory leading-tight truncate">
              {s.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-ink-300 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {s.city}, {s.country}
              </span>
            </div>
          </div>
        </div>
        <span
          className={cn(
            "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm whitespace-nowrap",
            statusColor[s.status]
          )}
        >
          {s.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-ink-200 leading-relaxed mb-4 line-clamp-2">{s.description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Stage</div>
          <div className={cn("text-sm", stageColor[s.stage])}>{s.stage}</div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Total raised</div>
          <div className="text-sm font-semibold text-ivory">{formatCompact(s.totalRaised)}</div>
        </div>
      </div>

      {/* Momentum bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Momentum</div>
          <div className={cn("flex items-center gap-1 text-xs font-mono", momentumColor)}>
            <MomentumIcon className="w-3 h-3" />
            <span>{s.momentum}</span>
          </div>
        </div>
        <div className="h-1 bg-ink-700 rounded-sm overflow-hidden">
          <div
            className={cn(
              "h-full transition-all",
              s.momentum >= 75
                ? "bg-emerald"
                : s.momentum >= 50
                  ? "bg-gold/70"
                  : "bg-signal-down/70"
            )}
            style={{ width: `${s.momentum}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-ink-700/60">
        <div className="text-[10px] font-mono text-ink-400">
          Last round: {new Date(s.lastRoundDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </div>
        <div className="text-[10px] font-mono text-ink-300 truncate ml-2">
          {s.investors.slice(0, 2).join(" · ")}
          {s.investors.length > 2 ? ` +${s.investors.length - 2}` : ""}
        </div>
      </div>
    </article>
  );
}
