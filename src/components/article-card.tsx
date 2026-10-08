import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Article } from "@/data/articles";
import { categories } from "@/data/site";
import { cn } from "@/lib/utils";

type Variant = "hero" | "feature" | "standard" | "compact" | "list";

type Props = {
  article: Article;
  variant?: Variant;
  className?: string;
};

/** Text-safe category colors on light surfaces. */
const categoryColor: Record<string, string> = {
  business: "text-emerald-deep border-emerald-600/30",
  culture: "text-gold-deep border-gold-deep/30",
  innovation: "text-coal border-coal/20",
  sports: "text-emerald-deep border-emerald-600/30",
  politics: "text-gold-deep border-gold-deep/30",
  music: "text-coal border-coal/20",
};

const categoryBg: Record<string, string> = {
  business: "bg-emerald-600/10",
  culture: "bg-gold/15",
  innovation: "bg-coal/5",
  sports: "bg-emerald-600/10",
  politics: "bg-gold/15",
  music: "bg-coal/5",
};

const categoryLabel = (slug: string) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

function CardImage({
  article,
  cat,
  large,
}: {
  article: Article;
  cat: string;
  large?: boolean;
}) {
  if (article.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={article.image}
        alt={article.imageCaption ?? article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-cream via-line to-cream flex items-center justify-center">
      <div
        className={cn(
          "text-faint/60 font-display font-bold select-none",
          large ? "text-[120px]" : "text-[80px]"
        )}
      >
        {cat.split(" ")[0].slice(0, 2)}
      </div>
    </div>
  );
}

export function ArticleCard({ article, variant = "standard", className }: Props) {
  const color = categoryColor[article.category];
  const bg = categoryBg[article.category];
  const cat = categoryLabel(article.category);

  if (variant === "hero") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          "group block relative overflow-hidden rounded-2xl bg-card border border-line hover:border-gold/60 hover:shadow-lg transition-all",
          className
        )}
      >
        <div className="aspect-[16/10] relative bg-cream overflow-hidden">
          <CardImage article={article} cat={cat} large />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={cn("px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border rounded-full bg-black/40 text-white border-white/20 backdrop-blur-sm")}>
              {cat}
            </span>
            {article.trending && (
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full bg-emerald/90 text-white flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="font-extrabold tracking-tight text-3xl sm:text-4xl text-coal leading-[1.1] group-hover:text-gold-deep transition-colors">
            {article.title}
          </h2>
          <p className="mt-4 text-smoke leading-relaxed">{article.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-xs font-mono text-faint">
            <span className="text-coal font-semibold">{article.author}</span>
            {article.authorRole && (
              <>
                <span>·</span>
                <span>{article.authorRole}</span>
              </>
            )}
            <span>·</span>
            <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readMinutes} min
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          "group block relative overflow-hidden rounded-2xl bg-card border border-line hover:border-gold/60 hover:shadow-lg transition-all",
          className
        )}
      >
        <div className="aspect-[16/9] relative bg-cream overflow-hidden">
          <CardImage article={article} cat={cat} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-sm">
            {cat}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-extrabold tracking-tight text-xl text-coal leading-tight group-hover:text-gold-deep transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-smoke line-clamp-2">{article.excerpt}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-faint">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.readMinutes} min</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          "group flex items-start gap-4 py-4 border-b border-line",
          className
        )}
      >
        <div className="shrink-0 w-16 text-right">
          <div className="text-3xl font-extrabold tracking-tight text-gold-deep leading-none">
            {String(article.readMinutes).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-mono uppercase text-faint mt-1">min read</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn("text-[10px] font-mono uppercase tracking-widest", color.split(" ")[0])}>
              {cat}
            </span>
            {article.trending && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-deep flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Hot
              </span>
            )}
          </div>
          <h3 className="font-bold text-lg text-coal leading-tight group-hover:text-gold-deep transition-colors">
            {article.title}
          </h3>
          <div className="mt-1.5 text-[11px] font-mono text-faint">
            {article.author} · {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn("group block py-3 border-b border-line/70 last:border-0", className)}
      >
        <div className={cn("text-[10px] font-mono uppercase tracking-widest mb-1", color.split(" ")[0])}>
          {cat}
        </div>
        <h3 className="font-bold text-[15px] text-coal leading-snug group-hover:text-gold-deep transition-colors">
          {article.title}
        </h3>
        <div className="mt-1 text-[10px] font-mono text-faint">
          {article.readMinutes} min · {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
        </div>
      </Link>
    );
  }

  // standard
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group block bg-card border border-line rounded-2xl overflow-hidden hover:border-gold/60 hover:shadow-md transition-all",
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-full", color, bg)}>
            {cat}
          </span>
        </div>
        <h3 className="font-extrabold tracking-tight text-lg text-coal leading-tight group-hover:text-gold-deep transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-smoke line-clamp-3">{article.excerpt}</p>
        <div className="mt-3 text-[11px] font-mono text-faint">
          {article.author} · {article.readMinutes} min
        </div>
      </div>
    </Link>
  );
}
