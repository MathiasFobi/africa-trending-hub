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
};

const initial: TickerItem[] = [
  { symbol: "NGX", label: "Nigerian Stock Exchange", value: 102_485, decimals: 0, change: 0.42 },
  { symbol: "JSE", label: "Johannesburg SE", value: 78_241, decimals: 0, change: -0.18 },
  { symbol: "BRVM", label: "BRVM (West Africa)", value: 286, decimals: 1, change: 0.31 },
  { symbol: "USE", label: "Uganda SE", value: 1_412, decimals: 0, change: 0.07 },
  { symbol: "EGX30", label: "Egypt EGX30", value: 31_204, decimals: 0, change: -0.92 },
  { symbol: "USD/NGN", label: "US Dollar / Naira", value: 1_485, decimals: 0, change: -0.18, unit: "₦" },
  { symbol: "USD/KES", label: "US Dollar / Shilling", value: 129.4, decimals: 1, change: 0.05, unit: "KSh" },
  { symbol: "USD/ZAR", label: "US Dollar / Rand", value: 18.32, decimals: 2, change: 0.21, unit: "R" },
  { symbol: "BTC", label: "Bitcoin", value: 108_420, decimals: 0, change: 1.4, unit: "$" },
  { symbol: "GOLD", label: "Gold (oz)", value: 4_217, decimals: 0, change: 0.62, unit: "$" },
  { symbol: "OIL", label: "Brent Crude", value: 94.18, decimals: 2, change: 1.12, unit: "$" },
  { symbol: "AFR-VC", label: "African VC (Q2 26)", value: 2.85, decimals: 2, change: 0.18, unit: "$B" },
];

function drift(value: number, magnitude: number) {
  return value * (1 + (Math.random() - 0.5) * magnitude);
}

export function PulseTicker() {
  const [items, setItems] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => {
          const magnitude = 0.0008;
          const newVal = drift(it.value, magnitude);
          return { ...it, value: newVal };
        })
      );
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink-900 border-y border-ink-700/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <Activity className="w-3.5 h-3.5 text-emerald pulse-emerald" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald font-semibold">
            Pulse
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex gap-7 animate-[scroll_60s_linear_infinite] whitespace-nowrap">
            {[...items, ...items].map((it, i) => {
              const up = it.change >= 0;
              return (
                <div key={`${it.symbol}-${i}`} className="flex items-center gap-1.5 font-mono text-[11px]">
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
