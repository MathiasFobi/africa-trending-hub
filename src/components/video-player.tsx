"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import type Player from "video.js/dist/types/player";
import type { VideoItem } from "@/data/videos";

type Props = {
  video: VideoItem;
  autoplay?: boolean;
  onEnded?: () => void;
  className?: string;
};

function buildSrc(video: VideoItem) {
  if (video.source === "youtube") {
    return {
      type: "video/youtube" as const,
      src: `https://www.youtube.com/watch?v=${video.src}`,
    };
  }
  if (video.source === "hls") {
    return { type: "application/x-mpegURL" as const, src: video.src };
  }
  return { type: "video/mp4" as const, src: video.src };
}

export function VideoPlayer({ video, autoplay, onEnded, className }: Props) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    // Make sure only one player instance per mount
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    const player = videojs(videoRef.current, {
      autoplay: autoplay ?? false,
      controls: true,
      responsive: true,
      fill: true,
      preload: "metadata",
      fluid: false,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      poster: video.poster,
      sources: [buildSrc(video)],
      controlBar: {
        pictureInPictureToggle: true,
        remainingTimeDisplay: true,
        volumePanel: { inline: false },
      },
    });

    player.on("ready", () => setReady(true));
    if (onEnded) player.on("ended", onEnded);

    playerRef.current = player;

    return () => {
      player.dispose();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.id]);

  return (
    <div className={`relative bg-black ${className ?? ""}`}>
      <div data-vjs-player className="aspect-video">
        <div ref={videoRef} className="video-js vjs-big-play-centered w-full h-full" />
      </div>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
