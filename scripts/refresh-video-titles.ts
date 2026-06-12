// One-shot: fetches live titles from YouTube oEmbed and rewrites videos.ts
// with the actual current titles + correct channel names. Run:
//   pnpm tsx scripts/refresh-video-titles.ts

import { writeFile, readFile } from "node:fs/promises";

type VideoItem = {
  id: string;
  title: string;
  duration: string;
  source: "youtube" | "mp4" | "hls";
  src: string;
  poster?: string;
  description: string;
  channel: string;
  publishedYear: number;
};

type VideoPlaylist = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  curator: string;
  category: "documentary" | "news" | "music" | "tech" | "culture" | "interview";
  totalDuration: string;
  videoCount: number;
  videos: VideoItem[];
  featured?: boolean;
};

async function fetchOembedTitle(id: string): Promise<{ title: string; channel: string } | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: string; author_name?: string };
    return { title: data.title ?? id, channel: data.author_name ?? "YouTube" };
  } catch {
    return null;
  }
}

async function main() {
  const VIDEOS_PATH = "src/data/videos.ts";
  const src = await readFile(VIDEOS_PATH, "utf-8");

  // Find every video with { id, src, title, channel } and update title + channel
  // from YouTube oEmbed. Use regex to find each object.
  const objectRegex = /\{[^{}]*?id:\s*"[^"]+",[\s\S]*?title:\s*"[^"]+",[\s\S]*?source:\s*"youtube",[\s\S]*?src:\s*"([a-zA-Z0-9_-]{11})",[\s\S]*?channel:\s*"[^"]+"[\s\S]*?\}/g;

  const matches = [...src.matchAll(objectRegex)];
  console.log(`Found ${matches.length} YouTube video objects in videos.ts`);

  let updatedSrc = src;
  let updated = 0;

  for (const m of matches) {
    const fullMatch = m[0];
    const videoId = m[1];
    const fetched = await fetchOembedTitle(videoId);
    if (!fetched) {
      console.log(`  SKIP ${videoId} (oembed failed)`);
      continue;
    }
    // Replace title and channel inside this object
    const newBlock = fullMatch
      .replace(/title:\s*"[^"]+"/, `title: ${JSON.stringify(fetched.title)}`)
      .replace(/channel:\s*"[^"]+"/, `channel: ${JSON.stringify(fetched.channel)}`);
    updatedSrc = updatedSrc.replace(fullMatch, newBlock);
    updated++;
    console.log(`  ${videoId}  →  ${fetched.title.slice(0, 80)}  (${fetched.channel})`);
  }

  await writeFile(VIDEOS_PATH, updatedSrc, "utf-8");
  console.log(`\n✅ updated ${updated} videos in ${VIDEOS_PATH}`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
