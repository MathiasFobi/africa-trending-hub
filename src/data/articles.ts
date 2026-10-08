export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "business" | "culture" | "innovation" | "sports" | "politics" | "music";
  author: string;
  authorRole?: string;
  publishedAt: string; // ISO
  readMinutes: number;
  image?: string;
  imageCaption?: string;
  featured?: boolean;
  trending?: boolean;
  tags?: string[];
  sourceUrl?: string;
  sourceName?: string;
};

export const articles: Article[] = [
  {
    slug: "cas-senegal-morocco-afcon-verdict",
    title: "CAS to Rule Within Days on the AFCON 2025 Title: Nine Months After the Rabat Final",
    excerpt:
      "Senegal won 1-0 in extra time. CAF awarded the title to Morocco 3-0 for a walk-off. On Thursday, sport's highest court in Lausanne heard the appeal — and African football's most controversial title will finally be decided.",
    category: "sports",
    author: "Tendai Moyo",
    authorRole: "Sports Editor",
    publishedAt: "2026-10-08T14:00:00Z",
    readMinutes: 9,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80",
    imageCaption: "The AFCON final under the lights — before the walk-off",
    featured: true,
    trending: true,
    tags: ["AFCON", "Senegal", "Morocco", "CAS"],
    sourceUrl:
      "https://www.reuters.com/sports/soccer/cas-promises-cup-nations-winner-decision-within-days-2026-10-08/",
    sourceName: "Reuters",
  },
  {
    slug: "afcon-2027-qualifiers-matchday-2",
    title: "AFCON 2027 Qualifiers: Matchday 2 Complete — Favorites Hold, Nigeria and Ghana Stumble",
    excerpt:
      "All 24 matches are done. Morocco, Côte d'Ivoire, South Africa, DR Congo, Rwanda, Mali and Guinea-Bissau sit on six points as the road to the Kenya-Tanzania-Uganda tournament heats up.",
    category: "sports",
    author: "Tendai Moyo",
    authorRole: "Sports Editor",
    publishedAt: "2026-10-07T16:30:00Z",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
    imageCaption: "Packed arena ahead of an AFCON qualifier",
    tags: ["AFCON 2027", "Qualifiers", "Football"],
    sourceUrl: "http://foot-africa.com/en/news/afcon-2027-qualifiers-all-results-scorers-and-standings-after-matchday-2-1378286/",
    sourceName: "Foot Africa",
  },
  {
    slug: "seyi-vibez-back-2-u-number-one",
    title: "Seyi Vibez's 'Back 2 U' Hits No. 1 — Fourth Chart-Topper From SWAGUU",
    excerpt:
      "Four singles from one project at the top of the Apple Music Nigeria chart. Seyi Vibez's SWAGUU is becoming one of the defining Afrobeats projects of the year.",
    category: "music",
    author: "Kemi Adeleke",
    authorRole: "Music Correspondent",
    publishedAt: "2026-10-08T11:00:00Z",
    readMinutes: 5,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
    imageCaption: "Crowd at a Lagos Afrobeats show, phone lights raised",
    trending: true,
    tags: ["Afrobeats", "Streaming", "Charts", "Seyi Vibez"],
    sourceUrl: "https://tooxclusive.com/news/back-2-u-seyi-vibez-apple-music-nigeria/",
    sourceName: "TooXclusive",
  },
  {
    slug: "blaqbonez-nomadinho-asake-reunion",
    title: "Blaqbonez Announces 'NOMADINHO: 4th Prime' — Reunites With Asake on 'Ikebe 3000'",
    excerpt:
      "The album lands October 16 via Chocolate City, a year after No Excuses. From their summer smash 'Chanel' to darker, late-night territory — the OAU alumni chemistry is back.",
    category: "music",
    author: "Kemi Adeleke",
    authorRole: "Music Correspondent",
    publishedAt: "2026-10-07T15:00:00Z",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    imageCaption: "Night set in Nigeria — the sound Blaqbonez is chasing",
    tags: ["Blaqbonez", "Asake", "Afrobeats", "Albums"],
    sourceUrl:
      "https://www.broadwayworld.com/bwwmusic/article/Photos-Blaqbonez-Announces-NOMADINHO-4TH-PRIME-Album-Reunites-with-Asake-20261002",
    sourceName: "BroadwayWorld",
  },
  {
    slug: "ayra-starr-nfl-london-halftime",
    title: "Ayra Starr to Become First Afrobeats Act to Headline an NFL Halftime Show",
    excerpt:
      "October 11, Tottenham Hotspur Stadium: the first-ever Afrobeats headliner at an NFL game. With 7 billion streams and two GRAMMY nominations behind her, the world stage keeps getting bigger.",
    category: "culture",
    author: "Lerato Dlamini",
    authorRole: "Culture Editor",
    publishedAt: "2026-10-07T12:00:00Z",
    readMinutes: 5,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
    imageCaption: "The scale of the stage: Tottenham Hotspur Stadium, October 11",
    tags: ["Ayra Starr", "NFL", "Afrobeats", "Diaspora"],
    sourceUrl:
      "https://meiza.ng/ayra-starr-makes-history-as-the-first-afrobeats-artiste-to-headline-an-nfl-halftime-show/",
    sourceName: "Meiza",
  },
  {
    slug: "satlyt-8m-seed-spacetech",
    title: "Nairobi-Sunnyvale SpaceTech Satlyt Raises $8M to Put AI Onboard Satellites",
    excerpt:
      "Software that lets satellite operators process data and run AI in orbit — led by non sibi ventures with TLCOM, Antler, Launch Africa Ventures and Enza Capital. A new front in African deep tech.",
    category: "innovation",
    author: "Wanjiku Mwangi",
    authorRole: "Innovation Reporter",
    publishedAt: "2026-10-06T09:00:00Z",
    readMinutes: 6,
    trending: true,
    tags: ["SpaceTech", "AI", "Kenya", "Funding"],
    sourceUrl: "https://www.businesstechafrica.co.za/article/breaking-news-today-monday-5-october-2026",
    sourceName: "Business Tech Africa",
  },
  {
    slug: "finca-ventures-prize-2026-winners",
    title: "FINCA's $400K Prize Backs Six Startups — VunaPay and Kumbatia Seafood Take Top Honors",
    excerpt:
      "Over 700 applications, two categories — fintech for inclusion and sustainable agriculture. Early catalytic capital is reaching founders traditional networks keep missing.",
    category: "innovation",
    author: "Wanjiku Mwangi",
    publishedAt: "2026-10-07T10:30:00Z",
    readMinutes: 5,
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1600&q=80",
    imageCaption: "Mobile money kiosk in West Africa — the rails FINCA wants built on",
    tags: ["Fintech", "AgriTech", "Grants", "Impact"],
    sourceUrl:
      "https://www.africa-newsroom.com/press/african-entrepreneurs-win-400000-in-catalytic-funding-to-scale-highimpact-startups",
    sourceName: "APO Group / Africa Newsroom",
  },
  {
    slug: "google-startups-accelerator-sa-2026",
    title: "Google Picks 15 South African Startups for Its 2026 Accelerator",
    excerpt:
      "From 1,057 applications to a three-month hybrid program ending in a December demo day: up to R1M in equity-free funding, Google models and cloud, and engineer mentorship.",
    category: "business",
    author: "Amara Okafor",
    authorRole: "Business Editor",
    publishedAt: "2026-10-07T08:00:00Z",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=1600&q=80",
    imageCaption: "A South African co-working scene — accelerator season",
    tags: ["Google", "Accelerators", "South Africa", "Startups"],
    sourceUrl: "https://www.businesstechafrica.co.za/article/breaking-news-today-tuesday-6-october-2026",
    sourceName: "Business Tech Africa",
  },
  {
    slug: "africa-startup-funding-q3-2026-rebound",
    title: "African Startups Raised $583M in Q3 — The Strongest Quarter of 2026",
    excerpt:
      "Up 70% year on year, with $1.39B across 137 startups so far. Big rounds — Jumia's $50M, Yellow Card's $40M — are doing the heavy lifting while early-stage breadth still lags.",
    category: "business",
    author: "Amara Okafor",
    publishedAt: "2026-10-06T13:00:00Z",
    readMinutes: 8,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80",
    imageCaption: "Lagos skyline — where much of the continent's capital still lands",
    tags: ["VC", "Funding", "Fintech", "Markets"],
    sourceUrl: "https://disruptafrica.com/2026/10/05/58-african-tech-startups-raise-583m-in-funding-in-q3/",
    sourceName: "Disrupt Africa",
  },
  {
    slug: "guinea-bissau-elections-delayed",
    title: "Guinea-Bissau Delays December Elections After Last Year's Coup",
    excerpt:
      "The prime minister says there are no conditions for the vote: parties missed the candidacy deadline, and ex-president Embalo was blocked from returning. West Africa's democratic stress test continues.",
    category: "politics",
    author: "Kwame Asante",
    authorRole: "Politics Correspondent",
    publishedAt: "2026-10-08T12:00:00Z",
    readMinutes: 7,
    tags: ["Guinea-Bissau", "Elections", "Democracy", "ECOWAS"],
    sourceUrl:
      "https://www.reuters.com/world/africa/guinea-bissau-delay-elections-following-last-years-coup-2026-10-08/",
    sourceName: "Reuters",
  },
  {
    slug: "afcfta-somalia-50th-state-party",
    title: "Somalia Becomes the 50th AfCFTA State — Mene Demands Delivery on Payments and Borders",
    excerpt:
      "Africa's $5B currency-conversion cost, Ethiopia's Modjo hub, and the AfCFTA chief's message in Cape Town: the agreement now needs logistics, payments and customs that actually work.",
    category: "politics",
    author: "Kwame Asante",
    authorRole: "Politics Correspondent",
    publishedAt: "2026-10-07T14:00:00Z",
    readMinutes: 8,
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=1600&q=80",
    imageCaption: "Container ship at an African port — the trade AfCFTA must serve",
    tags: ["AfCFTA", "Trade", "Somalia", "Ethiopia"],
    sourceUrl: "https://furtherafrica.com/2026/09/14/modjo-logistics-hub-opens-ethiopia-to-afcfta-trade/",
    sourceName: "Further Africa",
  },
  {
    slug: "adekunle-gold-jet-concert-aew-2026",
    title: "Adekunle Gold Headlines the JET Concert as African Energy Week Opens in Cape Town",
    excerpt:
      "October 12 at the Grand Africa Café & Beach: Mafikizolo, Roga Roga & Extra Musica and DJ Dollar join Adekunle Gold to kick off AEW 2026 — where energy policy meets the continent's biggest sounds.",
    category: "culture",
    author: "Lerato Dlamini",
    publishedAt: "2026-10-06T17:00:00Z",
    readMinutes: 5,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    imageCaption: "The stage — Grand Africa Café & Beach, October 12",
    tags: ["Adekunle Gold", "Concerts", "Cape Town", "Energy"],
    sourceUrl:
      "https://www.broadwayworld.com/bwwmusic/article/Adekunle-Gold-to-Headline-JET-Concert-at-African-Energy-Week-2026-20260903",
    sourceName: "BroadwayWorld",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeatured(): Article | undefined {
  return articles.find((a) => a.featured);
}

export function getTrending(): Article[] {
  return articles.filter((a) => a.trending);
}

export function getByCategory(slug: string): Article[] {
  return articles.filter((a) => a.category === slug);
}

export function getRelated(slug: string, category: string, limit = 3): Article[] {
  return articles.filter((a) => a.slug !== slug && a.category === category).slice(0, limit);
}
