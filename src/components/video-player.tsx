"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ExternalLink, AlertCircle } from "lucide-react";
import type { VideoItem } from "@/data/videos";
import { cn } from "@/lib/utils";

type Props = {
  video: VideoItem;
  autoplay?: boolean;
  onEnded?: () => void;
  className?: string;
};

type YTPlayer = {
  new (el: HTMLIFrameElement, config: object): {
    destroy: () => void;
  };
};
type YT = {
  Player: YTPlayer;
};
declare global {
  interface Window {
    YT?: { Player?: YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}export function VideoPlayer({ video, autoplay, onEnded, className }: Props) {
  // YouTube videos play via iframe (simplest, no plugin needed).
  // For mp4/hls we'd use video.js, but our fixture data is all YouTube.
  if (video.source === "youtube") {
    return (
      <YouTubeEmbed
        videoId={video.src}
        title={video.title}
        autoplay={autoplay ?? false}
        onEnded={onEnded}
        poster={video.poster}
        className={className}
      />
    );
  }

  // Fallback for mp4 / hls — not currently used, but wired for future
  return (
    <div className={cn("relative bg-black", className)}>
      <div className="aspect-video flex items-center justify-center">
        <div className="text-center text-ink-300 p-6">
          <AlertCircle className="w-10 h-10 text-gold mx-auto mb-2" />
          <p className="text-sm">
            Direct video playback (mp4 / hls) is wired but not yet enabled for{" "}
            <span className="text-ivory font-mono">{video.source}</span>.
          </p>
          <a
            href={video.src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold hover:text-ivory"
          >
            Open source <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

function YouTubeEmbed({
  videoId,
  title,
  autoplay,
  onEnded,
  poster,
  className,
}: {
  videoId: string;
  title: string;
  autoplay: boolean;
  onEnded?: () => void;
  poster?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(autoplay ?? false);
  const [ended, setEnded] = useState(false);
  const handleEnded = () => {
    setEnded(true);
    onEnded?.();
  };

  // Track iframes via window.YT.Player API. We init it on activation; pass
  // onEnded as a callback to the state-change handler.
  useEffect(() => {
    if (!activated) return;
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>("iframe");
    if (!iframe) return;
    setEnded(false);

    // Wait for the YouTube IFrame API to be ready
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let player: any = null;
    let pollHandle: ReturnType<typeof setInterval> | null = null;
    const init = () => {
      if (typeof window === "undefined" || !window.YT?.Player) return;
      player = new window.YT.Player(iframe, {
        events: {
          onStateChange: (e: { data: number }) => {
            // 0 = ended
            if (e.data === 0 && onEnded) {
              setEnded(true);
              onEnded();
            }
          },
        },
      });
    };
    if (window.YT?.Player) {
      init();
    } else {
      // Load the YouTube IFrame API script
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      ) as HTMLScriptElement | null;
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      pollHandle = setInterval(() => {
        if (window.YT?.Player) {
          if (pollHandle) clearInterval(pollHandle);
          init();
        }
      }, 200);
    }

    return () => {
      if (pollHandle) clearInterval(pollHandle);
      try {
        player?.destroy();
      } catch {
        // noop
      }
    };
  }, [activated, onEnded, videoId]);

  if (!activated) {
    return (
      <button
        onClick={() => setActivated(true)}
        className={cn(
          "relative aspect-video w-full bg-black group cursor-pointer overflow-hidden block",
          className,
        )}
        aria-label={`Play ${title}`}
      >
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold/95 group-hover:bg-gold group-hover:scale-110 flex items-center justify-center transition-all shadow-2xl shadow-gold/30">
            <Play className="w-9 h-9 sm:w-11 sm:h-11 text-midnight fill-midnight ml-1" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-left">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1">
            YouTube · Click to play
          </div>
          <div className="text-ivory text-sm sm:text-base font-medium line-clamp-2">
            {title}
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative aspect-video bg-black", className)}
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {/* Up-next hint: shown when video has ended, fades out after 6s */}
      {ended && onEnded && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center pointer-events-none animate-in fade-in duration-500">
          <div className="text-center px-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2">
              Up next
            </div>
            <div className="text-ivory text-lg sm:text-xl font-display font-bold mb-3 max-w-md mx-auto line-clamp-2">
              {title}
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-ink-300">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Loading next video…
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
