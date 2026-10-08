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
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-deep mb-1.5">
              {eyebrow}
            </div>
          )}
          <h2 className="font-extrabold tracking-tight text-2xl text-coal leading-tight">
            {title}
          </h2>
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="text-xs font-mono uppercase tracking-wider text-gold-deep hover:text-coal flex items-center gap-1.5 group shrink-0"
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
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-deep mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-gold" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-coal leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-smoke leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 mt-7 px-5 py-3 bg-gold text-midnight font-semibold rounded-xl hover:bg-gold-deep hover:text-white transition-colors"
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
        <div className="text-[10px] font-mono uppercase tracking-widest text-gold-deep mb-2 flex items-center gap-2">
          <span className="w-4 h-px bg-gold" />
          {eyebrow}
        </div>
      )}
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-extrabold tracking-tight text-3xl sm:text-4xl text-coal leading-tight">
          {title}
        </h2>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-mono uppercase tracking-wider text-gold-deep hover:text-coal group shrink-0"
          >
            {ctaLabel}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-smoke max-w-2xl">{description}</p>
      )}
    </div>
  );
}
