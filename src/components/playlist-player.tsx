"use client";

import { useState } from "react";
import { Play, Clock, CheckCircle2 } from "lucide-react";
import { type VideoPlaylist, type VideoItem } from "@/data/videos";
import { VideoPlayer } from "./video-player";
import { cn } from "@/lib/utils";

type Props = {
  playlist: VideoPlaylist;
};

const categoryColor: Record<VideoPlaylist["category"], string> = {
  documentary: "bg-gold/15 text-gold border-gold/30",
  news: "bg-signal-info/15 text-signal-info border-signal-info/30",
  music: "bg-emerald/15 text-emerald border-emerald/30",
  tech: "bg-ivory/10 text-ivory border-ivory/30",
  culture: "bg-gold/15 text-gold border-gold/30",
  interview: "bg-signal-up/15 text-signal-up border-signal-up/30",
};

export function PlaylistPlayer({ playlist }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = playlist.videos[currentIdx];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Player + meta */}
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer
          video={current}
          onEnded={() => {
            if (currentIdx < playlist.videos.length - 1) {
              setTimeout(() => setCurrentIdx(currentIdx + 1), 800);
            }
          }}
        />

        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm",
                categoryColor[playlist.category]
              )}
            >
              {playlist.category}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-300">
              {current.channel} · {current.publishedYear}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ivory leading-tight mb-2">
            {current.title}
          </h1>
          <p className="text-sm text-ink-200 leading-relaxed">{current.description}</p>
        </div>
      </div>

      {/* Playlist sidebar */}
      <aside className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base text-gold">
            {playlist.title}
          </h2>
          <span className="text-[10px] font-mono text-ink-300">
            {playlist.videoCount} videos · {playlist.totalDuration}
          </span>
        </div>
        <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
          {playlist.videos.map((v, i) => (
            <PlaylistRow
              key={v.id}
              video={v}
              index={i + 1}
              active={i === currentIdx}
              played={i < currentIdx}
              onClick={() => setCurrentIdx(i)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

function PlaylistRow({
  video,
  index,
  active,
  played,
  onClick,
}: {
  video: VideoItem;
  index: number;
  active: boolean;
  played: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left flex items-start gap-3 p-2.5 rounded-sm border transition-colors",
        active
          ? "bg-gold/10 border-gold/40"
          : "bg-ink-800/30 border-ink-700/40 hover:border-gold/30"
      )}
    >
      <div className="shrink-0 w-7 h-7 flex items-center justify-center">
        {active ? (
          <div className="w-2 h-2 rounded-full bg-gold pulse-gold" />
        ) : played ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
        ) : (
          <span className="text-[11px] font-mono text-ink-400">{index}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm leading-snug line-clamp-2 font-medium",
            active ? "text-gold" : "text-ivory"
          )}
        >
          {video.title}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] font-mono text-ink-400">
          <span className="truncate">{video.channel}</span>
          <span>·</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {video.duration.replace("PT", "").replace("M", ":").replace("S", "").toLowerCase()}
          </span>
        </div>
      </div>
      <Play
        className={cn(
          "w-3.5 h-3.5 shrink-0 mt-0.5",
          active ? "text-gold" : "text-ink-400 group-hover:text-gold"
        )}
      />
    </button>
  );
}
