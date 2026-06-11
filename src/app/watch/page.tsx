import { videoPlaylists, getFeaturedVideoPlaylists } from "@/data/videos";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";
import { Play, Clock, Film, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch — AfricaTrendingHub",
  description:
    "The AfricaTrendingHub video channel. Curated long-form documentaries, interviews, music, and reporting on the continent — organized into channels.",
};

const categoryColor: Record<string, string> = {
  documentary: "bg-gold/15 text-gold border-gold/30",
  news: "bg-signal-info/15 text-signal-info border-signal-info/30",
  music: "bg-emerald/15 text-emerald border-emerald/30",
  tech: "bg-ivory/10 text-ivory border-ivory/30",
  culture: "bg-gold/15 text-gold border-gold/30",
  interview: "bg-signal-up/15 text-signal-up border-signal-up/30",
};

export default function WatchPage() {
  const featured = getFeaturedVideoPlaylists();
  const all = videoPlaylists;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <SectionHeader
        eyebrow="Channel · Curated playlists"
        title="The Watch"
        description="Long-form video on the African continent — organized into themed channels. Each playlist is hand-curated, links are deep, and the player is built for storytelling."
      />

      {/* Featured hero */}
      {featured[0] && (
        <Link
          href={`/watch/${featured[0].slug}`}
          className="group block mb-10 relative overflow-hidden rounded-sm border border-ink-700 hover:border-gold/40 transition-colors"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div
              className="aspect-[16/9] lg:aspect-auto relative bg-cover bg-center"
              style={{ backgroundImage: `url(${featured[0].cover})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center">
                  <Play className="w-9 h-9 text-midnight fill-midnight ml-1" />
                </div>
              </div>
            </div>
            <div className="p-8 bg-ink-800/40 flex flex-col justify-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
                <Film className="w-3.5 h-3.5" />
                Featured channel
              </div>
              <h2 className="font-display font-bold text-3xl text-ivory leading-tight group-hover:text-gold transition-colors mb-2">
                {featured[0].title}
              </h2>
              <p className="text-sm text-ink-200 leading-relaxed mb-3">
                {featured[0].description}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-ink-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featured[0].totalDuration}
                </span>
                <span>·</span>
                <span>{featured[0].videoCount} videos</span>
                <span>·</span>
                <span>Curated by {featured[0].curator}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* All channels grid */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display font-bold text-xl text-gold">All channels</h3>
        <span className="text-[10px] font-mono text-ink-300">
          {all.length} playlists
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {all.map((pl) => (
          <Link
            key={pl.slug}
            href={`/watch/${pl.slug}`}
            className="group block bg-ink-800/40 border border-ink-700/60 hover:border-gold/40 rounded-sm overflow-hidden transition-colors"
          >
            <div
              className="aspect-[16/9] relative bg-cover bg-center"
              style={{ backgroundImage: `url(${pl.cover})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm ${categoryColor[pl.category]}`}
                >
                  {pl.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <Play className="w-5 h-5 text-midnight fill-midnight ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-display font-bold text-lg text-ivory leading-tight group-hover:text-gold transition-colors mb-1.5">
                {pl.title}
              </h4>
              <p className="text-xs text-ink-300 line-clamp-2 leading-relaxed mb-3">
                {pl.description}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-ink-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {pl.totalDuration}
                </span>
                <span>·</span>
                <span>{pl.videoCount} videos</span>
                <span className="ml-auto flex items-center gap-1 text-gold group-hover:gap-1.5 transition-all">
                  Open
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
