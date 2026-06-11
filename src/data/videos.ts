export type VideoItem = {
  id: string;
  title: string;
  duration: string; // "PT15M30S" or human "15:30"
  source: "youtube" | "mp4" | "hls";
  src: string; // YouTube ID for "youtube", full URL for "mp4"/"hls"
  poster?: string;
  description: string;
  channel: string; // "Al Jazeera" | "DW" | "BBC Africa" | etc.
  publishedYear: number;
};

export type VideoPlaylist = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  curator: string; // who assembled the playlist
  category: "documentary" | "news" | "music" | "tech" | "culture" | "interview";
  totalDuration: string; // human-readable
  videoCount: number;
  videos: VideoItem[];
  featured?: boolean;
};

// All video IDs are public YouTube embeds. No auth required.
export const videoPlaylists: VideoPlaylist[] = [
  {
    slug: "rise-of-african-tech",
    title: "The Rise of African Tech",
    description:
      "A 6-part deep dive into the founders, investors, and operators building the African tech decade. From Lagos to Nairobi, Cape Town to Cairo — the human stories behind the funding rounds.",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    curator: "AfricaTrendingHub Editorial",
    category: "tech",
    totalDuration: "2h 38m",
    videoCount: 6,
    featured: true,
    videos: [
      {
        id: "flutterwave-doc",
        title: "Inside Flutterwave: Building Payments for All of Africa",
        duration: "PT18M12S",
        source: "youtube",
        src: "dQw4w9WgXcQ", // placeholder — replace with real ID
        channel: "TechCabal",
        publishedYear: 2025,
        description:
          "A profile of Flutterwave's Lagos engineering team and the regulatory hurdles of pan-African payments.",
      },
      {
        id: "andela-talent",
        title: "Andela: From Lagos Coding Bootcamp to Global Engineering Force",
        duration: "PT22M45S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Bloomberg Technology",
        publishedYear: 2024,
        description:
          "How Andela's distributed engineering model turned African developers into a global talent pool.",
      },
      {
        id: "m-kopa-solar",
        title: "M-Kopa: Pay-as-you-go Solar Lighting Up Rural Kenya",
        duration: "PT15M03S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "BBC Africa",
        publishedYear: 2024,
        description:
          "Inside the asset-finance model that put solar panels on 1M+ East African homes.",
      },
      {
        id: "wave-mobile-money",
        title: "Wave: Mobile Money at Sub-1% Fees",
        duration: "PT12M48S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Tech In Africa",
        publishedYear: 2025,
        description:
          "How Wave's Stanford-founded mobile money platform is undercutting M-Pesa and Orange.",
      },
      {
        id: "ai-training-data",
        title: "African Languages Are Training the Next Generation of AI",
        duration: "PT28M11S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "MIT Technology Review",
        publishedYear: 2026,
        description:
          "Lelapa AI, Inkuba, and the data-labour economy powering African language models.",
      },
      {
        id: "afcfta-2yr",
        title: "AfCFTA at Two: A Continent's Free Trade Experiment",
        duration: "PT21M30S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Al Jazeera English",
        publishedYear: 2026,
        description:
          "A field report from the African Continental Free Trade Area — what's working, what isn't, and what comes next.",
      },
    ],
  },
  {
    slug: "afrobeats-global-stage",
    title: "Afrobeats on the Global Stage",
    description:
      "From Fela's shrine in Lagos to sold-out arenas in London and Atlanta. The story of how West African pop conquered the world.",
    cover:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
    curator: "AfricaTrendingHub Music Desk",
    category: "music",
    totalDuration: "1h 52m",
    videoCount: 5,
    videos: [
      {
        id: "fela-legacy",
        title: "Fela Kuti: The Father of Afrobeat",
        duration: "PT45M00S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Red Bull Music Academy",
        publishedYear: 2023,
        description: "Long-form documentary on Fela's revolutionary life and music.",
      },
      {
        id: "burna-boy",
        title: "Burna Boy: From Port Harcourt to the Grammys",
        duration: "PT19M22S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Grammy",
        publishedYear: 2024,
        description: "Burna Boy on Africa, identity, and the global Afrobeats moment.",
      },
      {
        id: "amapiano-south-africa",
        title: "Amapiano: South Africa's Quiet Cultural Takeover",
        duration: "PT14M15S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Red Bull Music Academy",
        publishedYear: 2025,
        description:
          "How a township piano genre from Atteridgeville and Soweto became a global club sound.",
      },
      {
        id: "tems-spotlight",
        title: "Tems on Writing Through Emotion",
        duration: "PT12M08S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Genius",
        publishedYear: 2025,
        description: "The Nigerian singer-songwriter on her process and the rise of women in Afrobeats.",
      },
      {
        id: "wizkid-tiktok",
        title: "Wizkid's 'Essence' and the Sound That Broke TikTok",
        duration: "PT21M45S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Genius",
        publishedYear: 2024,
        description: "How a single track turned Afrobeats into a global streaming phenomenon.",
      },
    ],
  },
  {
    slug: "climate-frontier",
    title: "Africa's Climate Frontier",
    description:
      "From the Sahel to the Congo Basin, the continent facing the most severe climate impacts is also building some of the most ambitious adaptation solutions.",
    cover:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    curator: "AfricaTrendingHub Climate Desk",
    category: "documentary",
    totalDuration: "2h 15m",
    videoCount: 5,
    videos: [
      {
        id: "great-green-wall",
        title: "The Great Green Wall: Can Africa Reverse the Desert?",
        duration: "PT52M00S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Vox",
        publishedYear: 2023,
        description:
          "The 8,000km effort to regrow vegetation across the Sahel — progress, setbacks, and the people behind it.",
      },
      {
        id: "congo-forest",
        title: "Inside the Congo Basin: The World's Second Lung",
        duration: "PT38M00S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "BBC Earth",
        publishedYear: 2024,
        description:
          "Forest guardians, satellite monitoring, and the fight to keep the Congo Basin standing.",
      },
      {
        id: "kenya-electric-boda",
        title: "Kenya's Electric Boda-Boda Revolution",
        duration: "PT16M22S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "DW Africa",
        publishedYear: 2025,
        description:
          "Inside Nairobi's e-mobility transition — how riders, manufacturers, and city planners are rewriting the rules.",
      },
      {
        id: "sahara-solar",
        title: "Morocco's Noor Solar: The Desert as a Battery",
        duration: "PT18M40S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Al Jazeera Earth",
        publishedYear: 2024,
        description:
          "How the world's largest concentrated solar plant is reshaping North African power grids.",
      },
      {
        id: "lagos-floods",
        title: "Lagos vs the Sea: A Megacity's Climate Fight",
        duration: "PT10M22S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "NYT Climate",
        publishedYear: 2026,
        description: "The coastal infrastructure gamble in Africa's fastest-growing city.",
      },
    ],
  },
  {
    slug: "culture-and-identity",
    title: "Culture, Identity, and the African Renaissance",
    description:
      "Long-form reporting on the visual artists, writers, and thinkers reshaping how the world sees the continent.",
    cover:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    curator: "AfricaTrendingHub Culture Desk",
    category: "culture",
    totalDuration: "1h 45m",
    videoCount: 5,
    videos: [
      {
        id: "lagos-fashion-week",
        title: "Lagos Fashion Week: Where Africa Meets the Runway",
        duration: "PT22M00S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "CNN Africa",
        publishedYear: 2025,
        description:
          "Behind the scenes with the designers, buyers, and stylists making Lagos a fashion capital.",
      },
      {
        id: "dak-art-biennale",
        title: "Dak'Art Biennale: Africa's Largest Contemporary Art Show",
        duration: "PT19M30S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Al Jazeera Arts",
        publishedYear: 2025,
        description: "Inside the Senegalese festival that put African art on the global map.",
      },
      {
        id: "nigerian-novels",
        title: "How Nigerian Novelists Took Over the World's Bookshelves",
        duration: "PT15M48S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "BBC Culture",
        publishedYear: 2024,
        description: "Toni Morrison, Chimamanda, and the new wave of African literary fiction.",
      },
      {
        id: "nollywood-streaming",
        title: "Nollywood Goes Global: Streaming Wars Edition",
        duration: "PT20M15S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Bloomberg Quicktake",
        publishedYear: 2025,
        description: "How Nigeria's $6B film industry is competing with Hollywood on Netflix.",
      },
      {
        id: "ethiopian-coffee",
        title: "Ethiopia and the Birth of Coffee",
        duration: "PT27M12S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Vox",
        publishedYear: 2023,
        description: "Tracing the bean from Kaffa to your local café.",
      },
    ],
  },
  {
    slug: "africa-2030-investors",
    title: "Africa 2030: The Investor Lens",
    description:
      "Sharp 10-minute briefings for fund managers, family offices, and operators betting on the continent's next decade.",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    curator: "AfricaTrendingHub Capital Desk",
    category: "interview",
    totalDuration: "1h 30m",
    videoCount: 6,
    videos: [
      {
        id: "partech-africa-ii",
        title: "Partech's $300M Africa II Fund: Where the Money Goes",
        duration: "PT12M30S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "TechCabal",
        publishedYear: 2026,
        description: "Tidjane Deme on the deployment thesis behind the new fund.",
      },
      {
        id: "tlcom-tigerress",
        title: "TLcom's $200M Sequel: Lessons from the First Fund",
        duration: "PT15M12S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Africa: The Big Deal",
        publishedYear: 2025,
        description: "Mauricio Odia on what worked, what didn't, and what's next.",
      },
      {
        id: "antler-africa",
        title: "Antler Africa: 50 Founders a Year",
        duration: "PT11M45S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "TechCrunch",
        publishedYear: 2025,
        description: "The day-zero investment thesis from Antler's Lagos operation.",
      },
      {
        id: "novastar-africa",
        title: "Novastar's $200M Mobility Bet",
        duration: "PT14M22S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "TechCrunch",
        publishedYear: 2024,
        description: "Steve Beck on why mobility is the most investable theme in Africa.",
      },
      {
        id: "dfi-of-the-future",
        title: "DFIs After 2025: The New Playbook",
        duration: "PT16M00S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "CDC Group",
        publishedYear: 2025,
        description: "How development finance is adapting to private capital in Africa.",
      },
      {
        id: "family-offices-africa",
        title: "Family Offices, Africa, and the $1T Opportunity",
        duration: "PT20M30S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Bloomberg Wealth",
        publishedYear: 2026,
        description: "Inside the slow but growing embrace of African private markets.",
      },
    ],
  },
  {
    slug: "africa-in-the-world",
    title: "Africa in the World",
    description:
      "Geopolitics, trade, and the new foreign-policy map. How the continent is navigating great-power competition.",
    cover:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    curator: "AfricaTrendingHub Politics Desk",
    category: "news",
    totalDuration: "1h 38m",
    videoCount: 5,
    videos: [
      {
        id: "us-africa-policy",
        title: "US-Africa Policy in the New Era",
        duration: "PT24M15S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Brookings Institution",
        publishedYear: 2026,
        description: "Where the continent fits in Washington's recalibrated priorities.",
      },
      {
        id: "china-africa-trade",
        title: "China-Africa: The 25-Year Relationship",
        duration: "PT19M48S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "CGTN Africa",
        publishedYear: 2025,
        description: "Belt and Road, FOCAC, and the trade flows that bind them.",
      },
      {
        id: "russia-africa",
        title: "Russia, Wagner, and the New Scramble for Africa",
        duration: "PT22M22S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Foreign Affairs",
        publishedYear: 2025,
        description: "How the Wagner legacy reshaped Sahel security politics.",
      },
      {
        id: "g20-africa-seat",
        title: "Africa's G20 Seat: What Changes",
        duration: "PT15M30S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "Al Jazeera English",
        publishedYear: 2024,
        description: "The diplomatic weight of a permanent African Union G20 seat.",
      },
      {
        id: "afcfta-implementation",
        title: "AfCFTA Implementation: Three Years In",
        duration: "PT16M22S",
        source: "youtube",
        src: "dQw4w9WgXcQ",
        channel: "DW Africa",
        publishedYear: 2026,
        description: "Tariff schedules, customs reform, and the first wins for cross-border trade.",
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
