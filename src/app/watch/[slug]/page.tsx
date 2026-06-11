import { notFound } from "next/navigation";
import { getVideoPlaylist, videoPlaylists } from "@/data/videos";
import { PlaylistPlayer } from "@/components/playlist-player";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return videoPlaylists.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const pl = getVideoPlaylist(slug);
  if (!pl) return { title: "Channel not found" };
  return {
    title: `${pl.title} — Watch`,
    description: pl.description,
    keywords: [pl.category, "African video", "documentary", pl.curator],
    openGraph: {
      type: "website",
      title: pl.title,
      description: pl.description,
      siteName: "AfricaTrendingHub",
      images: pl.cover ? [{ url: pl.cover, width: 1600, height: 900, alt: pl.title }] : undefined,
    },
  };
}

export default async function WatchPlaylistPage({ params }: { params: Params }) {
  const { slug } = await params;
  const pl = getVideoPlaylist(slug);
  if (!pl) notFound();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/watch"
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-300 hover:text-gold transition-colors mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All channels
      </Link>

      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ivory leading-tight mb-2">
          {pl.title}
        </h1>
        <p className="text-sm text-ink-300 max-w-3xl">{pl.description}</p>
        <p className="mt-2 text-[10px] font-mono text-ink-400">
          Curated by {pl.curator} · {pl.videoCount} videos · {pl.totalDuration}
        </p>
      </div>

      <PlaylistPlayer playlist={pl} />

      {/* Other channels strip */}
      <div className="mt-16 pt-10 border-t border-ink-700/60">
        <SectionHeader variant="compact" title="More channels" ctaLabel="All" ctaHref="/watch" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videoPlaylists
            .filter((p) => p.slug !== slug)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/watch/${p.slug}`}
                className="group bg-ink-800/40 border border-ink-700/60 hover:border-gold/40 rounded-sm overflow-hidden transition-colors"
              >
                <div
                  className="aspect-[16/9] bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${p.cover})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
                </div>
                <div className="p-4">
                  <h4 className="font-display font-bold text-sm text-ivory leading-tight group-hover:text-gold transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                  <div className="mt-1.5 text-[10px] font-mono text-ink-400">
                    {p.videoCount} videos · {p.totalDuration}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
