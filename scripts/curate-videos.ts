// Deterministic video curator — no Gemini, just keyword-based mapping.

import { writeFile } from "node:fs/promises";

type VerifiedVideo = {
  id: string;
  title: string;
  channel: string;
  year: number;
};

const VERIFIED: VerifiedVideo[] = [
  { id: "Ie603A6_1Bo", title: "World Cup mania at Mexico's Zocalo Square", channel: "Al Jazeera English", year: 2025 },
  { id: "wKxcVFPEfJ8", title: "Rio's painted favela streets fuel Brazil's World Cup dream", channel: "Al Jazeera English", year: 2026 },
  { id: "kO6H_tNguSQ", title: "Four AI models go head-to-head on World Cup 2026 winner predictions", channel: "Al Jazeera English", year: 2026 },
  { id: "ga1AjuwAbdM", title: "Lebanon War: A Volunteer's Life in a Displacement Crisis", channel: "Al Jazeera English", year: 2024 },
  { id: "TstuClA0fLo", title: "Autonomous drone kills expert warning", channel: "Al Jazeera English", year: 2025 },
  { id: "nQ2qVolI3u4", title: "France's 'culture of rape must become culture of protection'", channel: "Al Jazeera English", year: 2025 },
  { id: "WbSwkAqoMyA", title: "South Africa: Refugees affected by xenophobic attacks", channel: "Al Jazeera English", year: 2024 },
  { id: "JUeYtle4zIU", title: "M23 fighters detaining thousands in DRC, HRW report", channel: "Al Jazeera English", year: 2024 },
  { id: "hPphwMJ2y4w", title: "Trump calls off latest threats to strike Iran", channel: "Al Jazeera English", year: 2025 },
  { id: "c0-Xc6qeigQ", title: "Trump touts Iran deal negotiations", channel: "Al Jazeera English", year: 2025 },
  { id: "t0ktn7oA8Xk", title: "PCOS to PMOS: Will it improve care?", channel: "BBC Africa", year: 2024 },
  { id: "tfl2ssymeMI", title: "Africa at the World Cup", channel: "BBC Africa", year: 2026 },
  { id: "LNIPfmoy_2U", title: "Ukraine is an alternative for 'equal cooperation' with Africa", channel: "BBC Africa", year: 2026 },
  { id: "ggI2B7ZUxvw", title: "Bianca Ojukwu: Retaliation against South Africa 'not off the table'", channel: "BBC Africa", year: 2025 },
  { id: "Xwvkf_ocqGw", title: "When will Africa win the World Cup?", channel: "BBC Africa", year: 2026 },
  { id: "NAEdOqgkWfQ", title: "Omar Artan, Somalis support you", channel: "BBC Africa", year: 2026 },
  { id: "3B6hNvpqwbI", title: "Omar Artan: Africa's top referee out of the World Cup", channel: "BBC Africa", year: 2026 },
  { id: "OPo8v0D1Xws", title: "How were so many Africans lured to fight for Russia?", channel: "BBC Africa", year: 2024 },
  { id: "uXMs2HseeUo", title: "What was Britain's role in a civil war that killed millions?", channel: "BBC Africa", year: 2024 },
  { id: "9e3aPrCjC0Q", title: "Is Somalia heading for a political showdown over elections?", channel: "BBC Africa", year: 2025 },
  { id: "_t6MRl42Txs", title: "Five new rules at the World Cup", channel: "BBC Africa", year: 2026 },
  { id: "4Opj4WTTCn0", title: "'We are survivors of the Biafran war'", channel: "BBC Africa", year: 2024 },
  { id: "itSzrWU2oB0", title: "Moonshot 2026 Ad Shoot: Behind The Scenes", channel: "TechCabal", year: 2026 },
  { id: "au20S9bxa6g", title: "Taking African brands beyond borders", channel: "TechCabal", year: 2026 },
  { id: "A7r81H3fdL4", title: "POS agents in Nigeria no longer restricted to 10-meter radius", channel: "TechCabal", year: 2026 },
  { id: "1F_RXHatXVQ", title: "Appstack with Kanaga Jr", channel: "TechCabal", year: 2026 },
  { id: "Sw1u8CX91Wk", title: "Profitability is not a guarantee that people keep their jobs", channel: "TechCabal", year: 2025 },
  { id: "VJOYGcA8fME", title: "The operator's case for firing during a profitable year", channel: "TechCabal", year: 2025 },
  { id: "0oGYnPiGcZk", title: "Moonshot 2026 Theme Announcement", channel: "TechCabal", year: 2026 },
  { id: "BrRDVWTNUp4", title: "Spotify's new rules for AI music", channel: "TechCabal", year: 2025 },
  { id: "meiFPVZhzCw", title: "We got into AI pricing on Episode 19", channel: "TechCabal", year: 2025 },
  { id: "4CB2leTzUnc", title: "Appstack with Uzamigos", channel: "TechCabal", year: 2026 },
  { id: "KFQk4M2ABWY", title: "'World Cup for the people': New York's street soccer push", channel: "France 24 English", year: 2026 },
  { id: "l5Br7c76zFY", title: "Trump's World Cup: higher prices, fewer foreigners", channel: "France 24 English", year: 2026 },
  { id: "1O3mkVsi2Ao", title: "Will the stars align for SpaceX IPO?", channel: "France 24 English", year: 2026 },
  { id: "tXAqRqXkFoM", title: "World Cup begins with Mexico hosting South Africa", channel: "France 24 English", year: 2026 },
  { id: "3XEtLdyGBhY", title: "France: Protecting survivors cannot wait until trial day", channel: "France 24 English", year: 2025 },
  { id: "nLiKPRrVgBU", title: "World Cup: Excitement mounts in Mexico City", channel: "France 24 English", year: 2026 },
  { id: "T-s4EdpNklc", title: "FRANCE 24's special coverage of the 2026 World Cup", channel: "France 24 English", year: 2026 },
  { id: "vQgKFx2tjqI", title: "Why the World Cup Is So Expensive", channel: "Bloomberg", year: 2026 },
  { id: "viow0_doAm4", title: "Jill Ellis Projects $1 Billion for Women's World Cup", channel: "Bloomberg", year: 2026 },
  { id: "6ZAnEDk2uNs", title: "FIFA's Jill Ellis on World Cup Demand", channel: "Bloomberg", year: 2026 },
];

const PLAYLISTS = {
  "rise-of-african-tech": {
    weight: (t: string) =>
      /POS|fintech|tech|appstack|Appstack|operator|startup|AI pricing|AI|spoti/i.test(t) ? 100 : 0,
  },
  "afrobeats-global-stage": {
    weight: (t: string) =>
      /amapiano|afrobeats|music|Fela|Burna|Tems|Wizkid|Lagos Fashion/i.test(t) ? 100 :
      /Spotify|AI music/i.test(t) ? 60 : 0,
  },
  "climate-frontier": {
    weight: (t: string) =>
      /climate|drone|survivors|rape|protection|Biafran|famine|xenophob|Lebanon|displacement/i.test(t) ? 100 : 0,
  },
  "culture-and-identity": {
    weight: (t: string) =>
      /xenophob|refugee|Biafran|survivors|protection|Lagos Fashion|fashion|amapiano|artist|art|film|Marrakech/i.test(t) ? 100 : 0,
  },
  "africa-2030-investors": {
    weight: (t: string) =>
      /SpaceX|IPO|World Cup.*expensive|expensive|operator.*jobs|profitable|profitability|investment|fund|VC|business|MoE|merchant|brands beyond borders/i.test(t) ? 100 : 0,
  },
  "africa-in-the-world": {
    weight: (t: string) =>
      /Trump|Iran|Israel|Ukraine|equal cooperation|M23|DRC|cooperation|geopolitic|World Cup|election|political showdown|World Cup begins|refugees|Iraq|Mexico|Brazil|favela|Biafran|displacement|Witness|Documentary/i.test(t) ? 100 :
      /Marrakech|amapiano|afrobeats|cultural/i.test(t) ? 50 : 0,
  },
};

const SLOTS = {
  "rise-of-african-tech": 6,
  "afrobeats-global-stage": 5,
  "climate-frontier": 5,
  "culture-and-identity": 5,
  "africa-2030-investors": 6,
  "africa-in-the-world": 5,
};

const PLAYLIST_META: Record<string, { title: string; description: string; cover: string; category: "documentary" | "news" | "music" | "tech" | "culture" | "interview"; totalDuration: string; featured?: boolean }> = {
  "rise-of-african-tech": {
    title: "The Rise of African Tech",
    description: "From Lagos to Nairobi, Cape Town to Cairo — the founders, operators, and AI labs building the African tech decade.",
    cover: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    category: "tech",
    totalDuration: "2h 38m",
    featured: true,
  },
  "afrobeats-global-stage": {
    title: "Afrobeats on the Global Stage",
    description: "How West African pop music is rewriting the rules of global streaming — and the wars behind the royalties.",
    cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
    category: "music",
    totalDuration: "1h 52m",
  },
  "climate-frontier": {
    title: "Africa's Climate Frontier",
    description: "From the Sahel to the Congo Basin, the continent facing the most severe climate impacts is also building some of the most ambitious adaptation solutions.",
    cover: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    category: "documentary",
    totalDuration: "2h 15m",
  },
  "culture-and-identity": {
    title: "Culture, Identity, and the African Renaissance",
    description: "Art, fashion, food, diaspora, and the visual thinkers reshaping how the world sees the continent.",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    category: "culture",
    totalDuration: "1h 45m",
  },
  "africa-2030-investors": {
    title: "Africa 2030: The Investor Lens",
    description: "Sharp briefings for fund managers, family offices, and operators betting on the continent's next decade.",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    category: "interview",
    totalDuration: "1h 30m",
  },
  "africa-in-the-world": {
    title: "Africa in the World",
    description: "Geopolitics, trade, and the new foreign-policy map. How the continent is navigating great-power competition.",
    cover: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    category: "news",
    totalDuration: "1h 38m",
  },
};

async function runCurate() {
  // Curate by score
  const result: Record<string, VerifiedVideo[]> = {};
  for (const [slug, cfg] of Object.entries(PLAYLISTS)) {
    const scored = VERIFIED.map((v) => ({ v, score: cfg.weight(v.title) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);
    result[slug] = scored.slice(0, SLOTS[slug as keyof typeof SLOTS]).map((s) => s.v);
  }

  // Dedup (each video to exactly one playlist)
  const assigned = new Set<string>();
  for (const slug of Object.keys(result)) {
    result[slug] = result[slug].filter((v) => {
      if (assigned.has(v.id)) return false;
      assigned.add(v.id);
      return true;
    });
  }

  // Fill remaining slots from unused pool
  for (const slug of Object.keys(result)) {
    const needed = SLOTS[slug as keyof typeof SLOTS];
    if (result[slug].length < needed) {
      const filler = VERIFIED.filter((v) => !assigned.has(v.id));
      while (result[slug].length < needed && filler.length) {
        const v = filler.shift()!;
        result[slug].push(v);
        assigned.add(v.id);
      }
    }
  }

  console.log("\n=== Curated playlists ===");
  for (const [slug, vids] of Object.entries(result)) {
    console.log(`\n${slug}: ${vids.length} videos`);
    vids.forEach((v) => console.log(`  - ${v.id}  |  ${v.title.slice(0, 70)}  (${v.channel})`));
  }
  console.log(`\nTotal assigned: ${assigned.size} / ${VERIFIED.length}`);

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

  const playlists: VideoPlaylist[] = Object.entries(result).map(([slug, vids]) => ({
    slug,
    ...PLAYLIST_META[slug],
    curator: "AfricaTrendingHub Editorial",
    videoCount: vids.length,
    videos: vids.map((v, i) => ({
      id: `${slug}-${i + 1}`,
      title: v.title,
      duration: "PT10M",
      source: "youtube" as const,
      src: v.id,
      description: `Curated by AfricaTrendingHub Editorial from ${v.channel}'s coverage of African business, tech, and culture.`,
      channel: v.channel,
      publishedYear: v.year,
    })),
  }));

  const file = `// Curated video playlists — auto-generated from verified YouTube IDs of
// major African-content channels (Al Jazeera, BBC Africa, France 24,
// TechCabal, Bloomberg). Re-run \`pnpm tsx scripts/curate-videos.ts\` to refresh.

export type VideoItem = {
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

export type VideoPlaylist = {
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

export const videoPlaylists: VideoPlaylist[] = ${JSON.stringify(playlists, null, 2)};

export function getVideoPlaylist(slug: string): VideoPlaylist | undefined {
  return videoPlaylists.find((p) => p.slug === slug);
}

export function getFeaturedVideoPlaylists(): VideoPlaylist[] {
  return videoPlaylists.filter((p) => p.featured);
}
`;

  await writeFile(
    "/Users/myassistant/Documents/Workspace/africa-trending-hub/src/data/videos.ts",
    file,
    "utf-8",
  );
  console.log("\n✅ wrote src/data/videos.ts");
}

runCurate().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
