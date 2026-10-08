import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticle, getRelated, articles } from "@/data/articles";
import { categories } from "@/data/site";
import { formatDistanceToNow } from "date-fns";
import { Clock, TrendingUp, ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { ArticleCard } from "@/components/article-card";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const SITE_URL = "https://africa-trending-hub.vercel.app";

function ogUrl(params: { kind: string; title: string; subtitle?: string; eyebrow?: string }): string {
  const sp = new URLSearchParams({ kind: params.kind, title: params.title });
  if (params.subtitle) sp.set("subtitle", params.subtitle);
  if (params.eyebrow) sp.set("eyebrow", params.eyebrow);
  return `${SITE_URL}/api/og?${sp.toString()}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  const cat = categories.find((c) => c.slug === article.category);
  const ogImage = ogUrl({
    kind: "Article",
    title: article.title,
    subtitle: article.excerpt,
    eyebrow: cat?.label,
  });
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags ?? [],
    authors: [{ name: article.author }],
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      siteName: "AfricaTrendingHub",
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const cat = categories.find((c) => c.slug === article.category);
  const related = getRelated(slug, article.category, 3);

  // JSON-LD: NewsArticle
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author, jobTitle: article.authorRole },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "AfricaTrendingHub",
    },
    articleSection: cat?.label,
    keywords: (article.tags ?? []).join(", "),
  };

  return (
    <article>
      {/* Hero image */}
      {article.image && (
        <div className="relative w-full bg-ink-900 border-b border-ink-700/60">
          <div className="relative aspect-[21/9] max-h-[480px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.imageCaption ?? article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
            {article.imageCaption && (
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-ivory/80 bg-midnight/70 px-2 py-1 rounded-sm backdrop-blur">
                {article.imageCaption}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <header className="border-b border-line bg-gradient-to-b from-cream to-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-smoke hover:text-gold-deep transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/category/${article.category}`}
              className="text-[11px] font-mono uppercase tracking-widest text-gold-deep hover:text-coal transition-colors"
            >
              {cat?.label}
            </Link>
            {article.trending && (
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-deep flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
            {article.featured && (
              <span className="text-[11px] font-mono uppercase tracking-widest text-coal bg-coal/5 border border-line px-1.5 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-coal leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          <p className="mt-5 text-lg text-smoke leading-relaxed">{article.excerpt}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-smoke">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="text-coal font-semibold">{article.author}</span>
              {article.authorRole && <span className="text-faint">· {article.authorRole}</span>}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readMinutes} min read
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 text-smoke hover:text-gold-deep transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-none">
          {/* Lead paragraph */}
          <p className="text-xl text-coal leading-relaxed font-light mb-6">{article.excerpt}</p>

          {/* Filler body — fixture data is summary-only, so render a structured
              report with the available metadata + a placeholder body so the
              detail page has substance until real article copy is added. */}
          <p className="text-smoke leading-relaxed mb-5">
            {article.title} is the subject of our latest {cat?.label} dispatch from
            AfricaTrendingHub. This article is currently published as a {article.readMinutes}-minute
            briefing — the headline, framing, and reporting are in place; the long-form body and
            supporting field notes are wired up and ready to be filled with primary reporting.
          </p>

          <h2 className="font-display font-bold text-2xl text-coal mt-10 mb-4">What we know</h2>
          <p className="text-smoke leading-relaxed mb-5">
            The story cuts across the {cat?.label.toLowerCase()} beat. Filed by{" "}
            <span className="text-coal font-semibold">{article.author}</span>
            {article.authorRole && (
              <>, {article.authorRole}</>
            )}
            , it joins {articles.length - 1} other stories in our {cat?.label} coverage this cycle.
            {article.tags && article.tags.length > 0 && (
              <>
                {" "}Primary tags: {article.tags.join(", ")}.
              </>
            )}
          </p>

          <h2 className="font-display font-bold text-2xl text-coal mt-10 mb-4">Why it matters</h2>
          <p className="text-smoke leading-relaxed mb-5">
            Africa's news cycle moves fast, and the {cat?.label.toLowerCase()} sector is one of
            the most-watched verticals in our coverage. This piece lands in the middle of an
            active reporting window — readers tracking the category will want to bookmark it.
          </p>

          {article.tags && article.tags.length > 0 && (
            <>
              <h2 className="font-display font-bold text-2xl text-coal mt-10 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-smoke bg-cream border border-line px-2.5 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="mt-10 p-5 border border-gold/40 bg-gold/10 rounded-2xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-deep mb-1">
              Editor's note
            </div>
            <p className="text-sm text-smoke leading-relaxed">
              The full long-form body of this article is being prepared for publication. In the
              meantime, the headline, byline, and tags are locked, the article is indexable, and
              the URL is stable. Subscribe to our daily pulse to be notified when the long-form
              copy lands.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="font-extrabold tracking-tight text-xl text-coal mb-5">
              More from {cat?.label}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
