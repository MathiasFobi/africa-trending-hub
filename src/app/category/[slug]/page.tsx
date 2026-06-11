import { articles } from "@/data/articles";
import { categories } from "@/data/site";
import { SectionHeader } from "@/components/section-header";
import { ArticleCard } from "@/components/article-card";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category — AfricaTrendingHub" };
  return {
    title: `${cat.label} — AfricaTrendingHub`,
    description: cat.accent,
  };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const items = articles.filter((a) => a.category === slug);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <SectionHeader
        eyebrow={`Category · ${items.length} ${items.length === 1 ? "story" : "stories"}`}
        title={cat.label}
        description={cat.accent}
      />
      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-ink-300 text-sm">
          No stories filed under {cat.label} yet. Check back soon.
        </div>
      )}
    </section>
  );
}
