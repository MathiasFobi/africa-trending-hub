import { cn, formatCompact, formatPercent } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type Props = {
  label: string;
  value: number;
  unit?: "usd" | "percent" | "raw" | "count";
  change?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
  emphasis?: "gold" | "emerald" | "ivory";
  className?: string;
};

export function StatBlock({
  label,
  value,
  unit = "raw",
  change,
  prefix,
  suffix,
  hint,
  emphasis = "ivory",
  className,
}: Props) {
  let display: string;
  if (unit === "usd") display = formatCompact(value);
  else if (unit === "percent") display = `${value.toFixed(1)}%`;
  else if (unit === "count") display = value.toLocaleString();
  else display = `${prefix ?? ""}${value.toLocaleString()}${suffix ?? ""}`;

  const up = (change ?? 0) > 0;
  const down = (change ?? 0) < 0;

  return (
    <div
      className={cn(
        "p-5 bg-card border border-line rounded-2xl shadow-[0_1px_2px_rgba(30,27,20,0.04)]",
        className
      )}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-2">
        {label}
      </div>
      <div
        className={cn(
          "font-extrabold tracking-tight text-2xl sm:text-3xl tabular-nums leading-none",
          emphasis === "gold" && "text-gold-deep",
          emphasis === "emerald" && "text-emerald-deep",
          emphasis === "ivory" && "text-coal"
        )}
      >
        {display}
      </div>
      {(change !== undefined || hint) && (
        <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono">
          {change !== undefined && (
            <span
              className={cn(
                "flex items-center gap-0.5",
                up && "text-signal-up",
                down && "text-signal-down",
                !up && !down && "text-smoke"
              )}
            >
              {up && <ArrowUp className="w-3 h-3" />}
              {down && <ArrowDown className="w-3 h-3" />}
              {!up && !down && <Minus className="w-3 h-3" />}
              {formatPercent(change)}
            </span>
          )}
          {hint && <span className="text-faint">{hint}</span>}
        </div>
      )}
    </div>
  );
}
