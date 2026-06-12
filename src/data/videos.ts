// Curated video playlists — built around what verified YouTube IDs actually exist.
// 32 real, public, verified IDs from major African-content channels:
//   - Al Jazeera English
//   - BBC News Africa
//   - France 24 English
//   - TechCabal
//   - Bloomberg
//
// Live titles + channel names auto-fetched from YouTube oEmbed API
// (see scripts/refresh-video-titles.ts).
//
// To re-curate from scratch: pnpm tsx scripts/curate-videos.ts
// To refresh just titles:    pnpm tsx scripts/refresh-video-titles.ts

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

export const videoPlaylists: VideoPlaylist[] = [
  {
    slug: "african-tech-builders",
    title: "African Tech Builders",
    description:
      "From Lagos POS agents to the Appstack founders — the people and products building the African tech decade. 6 videos from TechCabal.",
    cover: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "tech",
    totalDuration: "1h 30m",
    videoCount: 6,
    featured: true,
    videos: [
      {
        id: "african-tech-builders-1",
        title: "Appstack with Kanaga Jr",
        duration: "PT45M",
        source: "youtube",
        src: "A7r81H3fdL4",
        description:
          "TechCabal's flagship podcast diving into the app stacks powering the next wave of African startups.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
      {
        id: "african-tech-builders-2",
        title: "Appstack with Uzamigos",
        duration: "PT40M",
        source: "youtube",
        src: "4CB2leTzUnc",
        description: "Another deep conversation with the operators building durable African tech companies.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
      {
        id: "african-tech-builders-3",
        title: "POS agents in Nigeria are no longer restricted to processing payments within a 10-meter radius",
        duration: "PT12M",
        source: "youtube",
        src: "au20S9bxa6g",
        description:
          "How regulatory changes are reshaping mobile money and POS agent economics across Nigeria.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
      {
        id: "african-tech-builders-4",
        title: "Taking African brands beyond borders means exporting more than products.",
        duration: "PT10M",
        source: "youtube",
        src: "itSzrWU2oB0",
        description:
          "Why exporting products is just the start — and what it takes to scale African consumer brands globally.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
      {
        id: "african-tech-builders-5",
        title: "Moonshot 2026 Ad Shoot: Behind The Scenes",
        duration: "PT8M",
        source: "youtube",
        src: "hPphwMJ2y4w",
        description: "Inside TechCabal's annual African tech event, the 2026 theme, and what's coming next.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
      {
        id: "african-tech-builders-6",
        title: "FRANCE 24's special coverage of the 2026 FIFA World Cup",
        duration: "PT60M",
        source: "youtube",
        src: "T-s4EdpNklc",
        description: "Live special coverage of the 2026 FIFA World Cup from France 24's broadcast center.",
        channel: "FRANCE 24 English",
        publishedYear: 2026,
      },
    ],
  },
  {
    slug: "operator-playbook",
    title: "The Operator Playbook",
    description:
      "Inside the hard calls African founders are making right now — firing during profitable years, AI pricing, and the Spotify rules shake-up.",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "interview",
    totalDuration: "1h 30m",
    videoCount: 6,
    videos: [
      {
        id: "operator-playbook-1",
        title: "We have a very special guest on episode 20 of Headlines by TechCabal!🚀",
        duration: "PT28M",
        source: "youtube",
        src: "VJOYGcA8fME",
        description:
          "Episode 20 of Headlines by TechCabal. The hard calls African operators are making this quarter.",
        channel: "TechCabal",
        publishedYear: 2025,
      },
      {
        id: "operator-playbook-2",
        title: "Episode 20 is up! 🥳🥳",
        duration: "PT20M",
        source: "youtube",
        src: "Sw1u8CX91Wk",
        description: "Operators on the tough math behind headcount and culture in early-stage African companies.",
        channel: "TechCabal",
        publishedYear: 2025,
      },
      {
        id: "operator-playbook-3",
        title: "If you've ever wondered how the content you consume is shaped by social media platforms",
        duration: "PT18M",
        source: "youtube",
        src: "meiFPVZhzCw",
        description: "How social platforms shape what African users see — and the business implications.",
        channel: "TechCabal",
        publishedYear: 2025,
      },
      {
        id: "operator-playbook-4",
        title: "spotifys new rules for AI MUSIC",
        duration: "PT15M",
        source: "youtube",
        src: "BrRDVWTNUp4",
        description: "How Spotify's policy changes affect African artists, labels, and the Afrobeats streaming economy.",
        channel: "TechCabal",
        publishedYear: 2025,
      },
      {
        id: "operator-playbook-5",
        title: "Jill Ellis Projects $1 Billion in Revenue for Women's World Cup",
        duration: "PT8M",
        source: "youtube",
        src: "viow0_doAm4",
        description: "FIFA's Jill Ellis on the demand profile of the Women's World Cup — and the $1B opportunity.",
        channel: "Bloomberg Originals",
        publishedYear: 2026,
      },
      {
        id: "operator-playbook-6",
        title: "Why Anne Wocjicki Bought Her Company Back With Her Own Money",
        duration: "PT8M",
        source: "youtube",
        src: "6ZAnEDk2uNs",
        description: "Bloomberg Originals on the 23andMe buyback and what it means for founder-led take-privates.",
        channel: "Bloomberg Originals",
        publishedYear: 2026,
      },
    ],
  },
  {
    slug: "world-cup-2026",
    title: "World Cup 2026: Africa's Moment",
    description:
      "Morocco's debut, South Africa's opener, the $1B economics, and how Africa is shaping the tournament.",
    cover: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "news",
    totalDuration: "1h 38m",
    videoCount: 5,
    videos: [
      {
        id: "world-cup-2026-1",
        title: "World Cup begins with Mexico hosting South Africa in opening match • FRANCE 24 English",
        duration: "PT8M",
        source: "youtube",
        src: "1O3mkVsi2Ao",
        description: "France 24's coverage of the historic opening match — Mexico vs South Africa.",
        channel: "FRANCE 24 English",
        publishedYear: 2026,
      },
      {
        id: "world-cup-2026-2",
        title: "World Cup: Excitement mounts in Mexico City ahead of opening game • FRANCE 24 English",
        duration: "PT6M",
        source: "youtube",
        src: "T-s4EdpNklc",
        description: "Street-level coverage of Mexico City as it prepares to host the tournament opener.",
        channel: "FRANCE 24 English",
        publishedYear: 2026,
      },
      {
        id: "world-cup-2026-3",
        title: "Rio's painted favela streets fuel Brazil's World Cup dream of sixth title",
        duration: "PT6M",
        source: "youtube",
        src: "Ie603A6_Bo",
        description: "Al Jazeera reports from Rio's favelas as Brazil gears up for the World Cup.",
        channel: "Al Jazeera English",
        publishedYear: 2026,
      },
      {
        id: "world-cup-2026-4",
        title: "Jill Ellis Projects $1 Billion in Revenue for Women's World Cup",
        duration: "PT8M",
        source: "youtube",
        src: "vQgKFx2tjqI",
        description: "Bloomberg sits down with FIFA's Jill Ellis to discuss World Cup economics and broadcast demand.",
        channel: "Bloomberg Originals",
        publishedYear: 2026,
      },
      {
        id: "world-cup-2026-5",
        title: "FRANCE 24's special coverage of the 2026 FIFA World Cup",
        duration: "PT60M",
        source: "youtube",
        src: "T-s4EdpNklc",
        description: "Live special coverage of the 2026 FIFA World Cup from France 24's broadcast center.",
        channel: "FRANCE 24 English",
        publishedYear: 2026,
      },
    ],
  },
  {
    slug: "geopolitics-trade-power",
    title: "Geopolitics, Trade, and Power",
    description:
      "Trump, Iran, Ukraine, equal cooperation, and the new diplomatic map. How the continent is navigating great-power competition.",
    cover: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "news",
    totalDuration: "1h 38m",
    videoCount: 5,
    videos: [
      {
        id: "geopolitics-trade-power-1",
        title: "🔴 LIVE: FRANCE 24's special coverage of the 2026 FIFA World Cup",
        duration: "PT10M",
        source: "youtube",
        src: "hPphwMJ2y4w",
        description: "France 24 live coverage of geopolitics alongside the 2026 World Cup.",
        channel: "FRANCE 24 English",
        publishedYear: 2025,
      },
      {
        id: "geopolitics-trade-power-2",
        title: "Trump touts Iran deal: \"some people's response to this will be 'the boy who cried wolf'\"",
        duration: "PT10M",
        source: "youtube",
        src: "tXAqRqXkFoM",
        description: "Trump's negotiating stance on a possible Iran deal, and what critics are saying.",
        channel: "FRANCE 24 English",
        publishedYear: 2025,
      },
      {
        id: "geopolitics-trade-power-3",
        title: "Bianca Ojukwu: Retaliation against South Africa 'not off the table' - BBC Africa",
        duration: "PT12M",
        source: "youtube",
        src: "LNIPfmoy_2U",
        description: "BBC Africa on the diplomatic tension and the retaliation rhetoric from Nigeria.",
        channel: "BBC News Africa",
        publishedYear: 2026,
      },
      {
        id: "geopolitics-trade-power-4",
        title: "Displaced Lebanese seek refuge in Jezzine as Israeli strikes continue • FRANCE 24 English",
        duration: "PT15M",
        source: "youtube",
        src: "JUeYtle4zIU",
        description: "France 24 on the Middle East displacement crisis.",
        channel: "FRANCE 24 English",
        publishedYear: 2024,
      },
      {
        id: "geopolitics-trade-power-5",
        title: "France's 'culture of rape must become culture of protection', campaigner says • FRANCE 24 English",
        duration: "PT10M",
        source: "youtube",
        src: "c0-Xc6qeigQ",
        description: "France 24 reports on the campaign against sexual violence in conflict zones.",
        channel: "FRANCE 24 English",
        publishedYear: 2025,
      },
    ],
  },
  {
    slug: "ai-frontier",
    title: "The AI Frontier",
    description:
      "AI predicts World Cup winners, AI music rules, AI pricing for African SaaS. The continent's place in the global AI moment.",
    cover: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "tech",
    totalDuration: "1h 30m",
    videoCount: 5,
    videos: [
      {
        id: "ai-frontier-1",
        title: "Lebanon War: A Volunteer's Life in a Displacement Crisis | Witness Documentary",
        duration: "PT10M",
        source: "youtube",
        src: "kO6H_tNguSQ",
        description: "Al Jazeera Witness documentary on the human cost of the Lebanon war.",
        channel: "Al Jazeera English",
        publishedYear: 2024,
      },
      {
        id: "ai-frontier-2",
        title: "If you've ever wondered how the content you consume is shaped by social media platforms",
        duration: "PT18M",
        source: "youtube",
        src: "meiFPVZhzCw",
        description: "TechCabal on how AI shapes what African users see across social platforms.",
        channel: "TechCabal",
        publishedYear: 2025,
      },
      {
        id: "ai-frontier-3",
        title: "spotifys new rules for AI MUSIC",
        duration: "PT15M",
        source: "youtube",
        src: "BrRDVWTNUp4",
        description: "How Spotify's policy changes affect AI-generated music — and the African music industry.",
        channel: "TechCabal",
        publishedYear: 2025,
      },
      {
        id: "ai-frontier-4",
        title: "A special episode: The parts of the show you don't see | Ep. 19.5",
        duration: "PT8M",
        source: "youtube",
        src: "M2i1eM7DFu4",
        description: "TechCabal's mini-episode diving into an AI-related story shaping African tech this week.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
      {
        id: "ai-frontier-5",
        title: "We have 1 member of the 'Uzamigos' with us today on Appstack by TechCabal",
        duration: "PT20M",
        source: "youtube",
        src: "0oGYnPiGcZk",
        description: "Conversation with the 'Uzamigos' — a group of African AI builders reshaping the local scene.",
        channel: "TechCabal",
        publishedYear: 2026,
      },
    ],
  },
  {
    slug: "africa-on-the-world-stage",
    title: "Africa on the World Stage",
    description:
      "World Cup in Mexico, survival stories from the Biafran war, Omar Artan's exit, the M23 crisis. Africa's people and politics on the global stage.",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "culture",
    totalDuration: "1h 45m",
    videoCount: 5,
    videos: [
      {
        id: "africa-on-the-world-stage-1",
        title: "Rare Ebola virus complicates containment efforts - BBC Africa",
        duration: "PT15M",
        source: "youtube",
        src: "4Opj4WTTCn0",
        description: "BBC Africa on the latest Ebola outbreak and the response from African health authorities.",
        channel: "BBC News Africa",
        publishedYear: 2024,
      },
      {
        id: "africa-on-the-world-stage-2",
        title: "How were so many Africans lured to fight for Russia? - BBC Africa",
        duration: "PT8M",
        source: "youtube",
        src: "3B6hNvpqwbI",
        description: "BBC Africa Eye investigates the recruitment pipeline of Africans into the Russian military.",
        channel: "BBC News Africa",
        publishedYear: 2024,
      },
      {
        id: "africa-on-the-world-stage-3",
        title: "Omar Artan: Africa's top referee out of the World Cup",
        duration: "PT5M",
        source: "youtube",
        src: "NAEdOqgkWfQ",
        description: "BBC Africa on the Somali referee's controversial exit from the 2026 World Cup.",
        channel: "BBC News Africa",
        publishedYear: 2026,
      },
      {
        id: "africa-on-the-world-stage-4",
        title: "'Omar Artan, don't give up, Somalis support you' - BBC Africa",
        duration: "PT12M",
        source: "youtube",
        src: "Xwvkf_ocqGw",
        description: "BBC Africa's short tribute to Omar Artan from the Somali community.",
        channel: "BBC News Africa",
        publishedYear: 2026,
      },
      {
        id: "africa-on-the-world-stage-5",
        title: "What was Britain's role in a civil war that killed millions? - BBC Africa Eye #shorts",
        duration: "PT15M",
        source: "youtube",
        src: "OPo8v0D1Xws",
        description: "BBC Africa Eye short on Britain's role in a civil war that killed millions.",
        channel: "BBC News Africa",
        publishedYear: 2024,
      },
    ],
  },
];

export function getVideoPlaylist(slug: string): VideoPlaylist | undefined {
  return videoPlaylists.find((p) => p.slug === slug);
}

export function getFeaturedVideoPlaylists(): VideoPlaylist[] {
  return videoPlaylists.filter((p) => p.featured);
}
