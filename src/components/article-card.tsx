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

const categoryColor: Record<string, string> = {
  business: "text-emerald border-emerald/40",
  culture: "text-gold border-gold/40",
  innovation: "text-ivory border-ivory/40",
  sports: "text-emerald border-emerald/40",
  politics: "text-gold border-gold/40",
  music: "text-ivory border-ivory/40",
};

const categoryBg: Record<string, string> = {
  business: "bg-emerald/10",
  culture: "bg-gold/10",
  innovation: "bg-ivory/10",
  sports: "bg-emerald/10",
  politics: "bg-gold/10",
  music: "bg-ivory/10",
};

const categoryLabel = (slug: string) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

export function ArticleCard({ article, variant = "standard", className }: Props) {
  const color = categoryColor[article.category];
  const bg = categoryBg[article.category];
  const cat = categoryLabel(article.category);

  if (variant === "hero") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={cn(
          "group block relative overflow-hidden rounded-sm bg-ink-800 border border-ink-700 hover:border-gold/40 transition-colors",
          className
        )}
      >
        <div className="aspect-[16/10] relative bg-ink-800 overflow-hidden">
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt={article.imageCaption ?? article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 flex items-center justify-center">
              <div className="text-ink-600 text-[120px] font-display font-bold opacity-20 select-none">
                {cat.split(" ")[0].slice(0, 2)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={cn("px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border rounded-sm", color, bg)}>
              {cat}
            </span>
            {article.trending && (
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-emerald/40 text-emerald bg-emerald/10 rounded-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory leading-[1.1] group-hover:text-gold transition-colors">
            {article.title}
          </h2>
          <p className="mt-4 text-ink-200 leading-relaxed">{article.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-xs font-mono text-ink-300">
            <span className="text-ivory font-semibold">{article.author}</span>
            {article.authorRole && (
              <>
                <span className="text-ink-500">·</span>
                <span>{article.authorRole}</span>
              </>
            )}
            <span className="text-ink-500">·</span>
            <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            <span className="text-ink-500">·</span>
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
          "group block relative overflow-hidden rounded-sm bg-ink-800 border border-ink-700 hover:border-gold/40 transition-colors",
          className
        )}
      >
        <div className="aspect-[16/9] relative bg-ink-800 overflow-hidden">
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt={article.imageCaption ?? article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900 flex items-center justify-center">
              <div className="text-ink-600 text-[80px] font-display font-bold opacity-20 select-none">
                {cat.split(" ")[0].slice(0, 2)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 to-transparent" />
          <span className={cn("absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-sm", color, bg)}>
            {cat}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-xl text-ivory leading-tight group-hover:text-gold transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-ink-300 line-clamp-2">{article.excerpt}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-ink-400">
            <span>{article.author}</span>
            <span className="text-ink-600">·</span>
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
          "group flex items-start gap-4 py-4 border-b border-ink-700/60 hover:border-gold/40 transition-colors",
          className
        )}
      >
        <div className="shrink-0 w-16 text-right">
          <div className="text-3xl font-display font-bold text-gold leading-none">
            {String(article.readMinutes).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-mono uppercase text-ink-400 mt-1">min read</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn("text-[10px] font-mono uppercase tracking-widest", color.split(" ")[0])}>
              {cat}
            </span>
            {article.trending && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Hot
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold text-lg text-ivory leading-tight group-hover:text-gold transition-colors">
            {article.title}
          </h3>
          <div className="mt-1.5 text-[11px] font-mono text-ink-400">
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
        className={cn("group block py-3", className)}
      >
        <div className={cn("text-[10px] font-mono uppercase tracking-widest mb-1", color.split(" ")[0])}>
          {cat}
        </div>
        <h3 className="font-display font-semibold text-base text-ivory leading-snug group-hover:text-gold transition-colors">
          {article.title}
        </h3>
        <div className="mt-1 text-[10px] font-mono text-ink-400">
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
        "group block bg-ink-800/50 border border-ink-700/60 rounded-sm overflow-hidden hover:border-gold/40 transition-colors",
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-sm", color, bg)}>
            {cat}
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-ivory leading-tight group-hover:text-gold transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-ink-300 line-clamp-3">{article.excerpt}</p>
        <div className="mt-3 text-[11px] font-mono text-ink-400">
          {article.author} · {article.readMinutes} min
        </div>
      </div>
    </Link>
  );
}
