import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  variant?: "default" | "compact" | "hero";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  className,
  variant = "default",
}: Props) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-end justify-between mb-5", className)}>
        <div>
          {eyebrow && (
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1.5">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display font-bold text-2xl text-ivory leading-tight">
            {title}
          </h2>
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="text-xs font-mono uppercase tracking-wider text-gold hover:text-ivory flex items-center gap-1.5 group"
          >
            {ctaLabel}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>
    );
  }
  if (variant === "hero") {
    return (
      <div className={cn("max-w-3xl", className)}>
        {eyebrow && (
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-gold" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-ivory leading-[1.05] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-ink-200 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 mt-7 px-5 py-3 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    );
  }
  return (
    <div className={cn("mb-6", className)}>
      {eyebrow && (
        <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
          <span className="w-4 h-px bg-gold" />
          {eyebrow}
        </div>
      )}
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory leading-tight">
          {title}
        </h2>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-mono uppercase tracking-wider text-gold hover:text-ivory group shrink-0"
          >
            {ctaLabel}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-ink-300 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
