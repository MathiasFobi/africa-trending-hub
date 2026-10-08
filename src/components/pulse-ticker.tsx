"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type TickerItem = {
  symbol: string;
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  change: number; // percent
  stale?: boolean;
};

// Fixture fallback — shown until /api/pulse responds, and per-symbol whenever
// a provider is unreachable (stale items are dimmed).
const initial: TickerItem[] = [
  { symbol: "NGX", label: "Nigerian Stock Exchange", value: 102_485, decimals: 0, change: 0.42, stale: true },
  { symbol: "JSE", label: "Johannesburg SE", value: 78_241, decimals: 0, change: -0.18, stale: true },
  { symbol: "BRVM", label: "BRVM (West Africa)", value: 286, decimals: 1, change: 0.31, stale: true },
  { symbol: "USE", label: "Uganda SE", value: 1_412, decimals: 0, change: 0.07, stale: true },
  { symbol: "EGX30", label: "Egypt EGX30", value: 31_204, decimals: 0, change: -0.92, stale: true },
  { symbol: "USD/NGN", label: "US Dollar / Naira", value: 1_485, decimals: 0, change: -0.18, unit: "₦", stale: true },
  { symbol: "USD/KES", label: "US Dollar / Shilling", value: 129.4, decimals: 1, change: 0.05, unit: "KSh", stale: true },
  { symbol: "USD/ZAR", label: "US Dollar / Rand", value: 18.32, decimals: 2, change: 0.21, unit: "R", stale: true },
  { symbol: "BTC", label: "Bitcoin", value: 108_420, decimals: 0, change: 1.4, unit: "$", stale: true },
  { symbol: "GOLD", label: "Gold (oz)", value: 4_217, decimals: 0, change: 0.62, unit: "$", stale: true },
  { symbol: "OIL", label: "Brent Crude", value: 94.18, decimals: 2, change: 1.12, unit: "$", stale: true },
  { symbol: "AFR-VC", label: "African VC (Q3 2026)", value: 0.58, decimals: 2, change: 124.11, unit: "$B", stale: true },
];

const POLL_MS = 90_000;

export function PulseTicker() {
  const [items, setItems] = useState(initial);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/pulse", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { items?: TickerItem[] };
        if (cancelled || !Array.isArray(data.items) || data.items.length === 0) return;
        setItems(data.items);
        setLive(data.items.some((i) => !i.stale));
      } catch {
        // keep fixture fallback
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="bg-ink-900 border-y border-ink-700/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <Activity className="w-3.5 h-3.5 text-emerald pulse-emerald" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald font-semibold">
            Pulse
          </span>
          <span
            title={live ? "Live market data" : "Showing cached values"}
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              live ? "bg-emerald-400" : "bg-amber-400"
            )}
          />
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex gap-7 animate-[scroll_60s_linear_infinite] whitespace-nowrap">
            {[...items, ...items].map((it, i) => {
              const up = it.change >= 0;
              return (
                <div
                  key={`${it.symbol}-${i}`}
                  title={it.stale ? "Cached value — provider unreachable" : it.label}
                  className={cn(
                    "flex items-center gap-1.5 font-mono text-[11px]",
                    it.stale && "opacity-50"
                  )}
                >
                  <span className="text-ink-300">{it.symbol}</span>
                  <span className="text-ivory tabular-nums">
                    {it.unit ?? ""}
                    {it.value.toLocaleString("en-US", {
                      minimumFractionDigits: it.decimals ?? 0,
                      maximumFractionDigits: it.decimals ?? 0,
                    })}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 tabular-nums",
                      up ? "text-signal-up" : "text-signal-down"
                    )}
                  >
                    {up ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                    {Math.abs(it.change).toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
