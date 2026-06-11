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
    slug: "nigeria-digital-infrastructure-push",
    title: "Nigeria's $2B Digital Infrastructure Push Could Reshape West African Commerce",
    excerpt:
      "Lagos is positioning itself as the continent's data hub. Inside the funding, fiber rollouts, and the data-center boom that could shift the center of gravity for African commerce.",
    category: "business",
    author: "Amara Okafor",
    authorRole: "Business Editor",
    publishedAt: "2026-06-10T08:00:00Z",
    readMinutes: 9,
    image: "https://images.unsplash.com/photo-1591465001443-58ad7d039412?w=1600&q=80",
    imageCaption: "Lagos skyline at dusk with data-center district glow",
    featured: true,
    trending: true,
    tags: ["Nigeria", "Fintech", "Infrastructure"],
  },
  {
    slug: "afrobeats-global-streaming-milestone",
    title: "Afrobeats Crosses 40% of Sub-Saharan Streaming — And the Royalties Are Finally Following",
    excerpt:
      "A decade after the genre broke globally, streaming payouts are catching up. We trace the numbers, the disputes, and what comes next for African artists.",
    category: "music",
    author: "Kemi Adeleke",
    authorRole: "Music Correspondent",
    publishedAt: "2026-06-10T06:30:00Z",
    readMinutes: 7,
    image: "https://images.unsplash.com/photo-1571266028243-d220c6a04e91?w=1600&q=80",
    imageCaption: "Crowd at a Lagos Afrobeats festival, phone lights raised",
    trending: true,
    tags: ["Music", "Streaming", "Royalties"],
  },
  {
    slug: "kenya-electric-mobility-boda-boda",
    title: "How Kenya's Electric Boda-Boda Pilots Are Quietly Outpacing Lagos",
    excerpt:
      "Nairobi's e-mobility experiment is scaling faster than expected — and the riders are seeing real savings. A field report from Eastleigh.",
    category: "innovation",
    author: "Wanjiku Mwangi",
    authorRole: "Innovation Reporter",
    publishedAt: "2026-06-09T14:15:00Z",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=1600&q=80",
    imageCaption: "Electric boda-boda charging station in Eastleigh, Nairobi",
    trending: true,
    tags: ["Kenya", "Mobility", "Climate"],
  },
  {
    slug: "africa-cup-of-nations-economic-impact",
    title: "AFCON 2026: The $1.4B Economic Impact Behind the Tournament",
    excerpt:
      "Host cities, broadcasters, and sponsors are projecting record returns. We map the commercial flows behind Africa's biggest sporting event.",
    category: "sports",
    author: "Tendai Moyo",
    authorRole: "Sports Editor",
    publishedAt: "2026-06-09T11:00:00Z",
    readMinutes: 8,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80",
    imageCaption: "AFCON match under stadium lights in Côte d'Ivoire",
    tags: ["AFCON", "Sports Business"],
  },
  {
    slug: "diaspora-remittance-corridors-shift",
    title: "The New Remittance Corridors: How the Diaspora Is Reshaping African Capital",
    excerpt:
      "Cross-border payment rails built for remittances are now powering small business. Inside the fintech stack behind the diaspora dollar.",
    category: "business",
    author: "Amara Okafor",
    publishedAt: "2026-06-08T16:00:00Z",
    readMinutes: 10,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e53?w=1600&q=80",
    imageCaption: "Mobile money kiosk in West Africa, queue of customers",
    tags: ["Remittances", "Fintech"],
  },
  {
    slug: "amapiano-south-africa-cultural-shift",
    title: "Amapiano's South African Heartland: A Cultural Geography",
    excerpt:
      "From Atteridgeville to the world — a long-form look at the townships, producers, and dance floors that built a genre.",
    category: "culture",
    author: "Lerato Dlamini",
    authorRole: "Culture Editor",
    publishedAt: "2026-06-08T09:30:00Z",
    readMinutes: 12,
    image: "https://images.unsplash.com/photo-1574391884720-bbc049ec09ad?w=1600&q=80",
    imageCaption: "Amapiano night in Soweto, dancers mid-step",
    tags: ["Amapiano", "South Africa", "Culture"],
  },
  {
    slug: "continental-free-trade-2-year-review",
    title: "AfCFTA at Two: What's Working, What's Stuck, and Where the Money Is Going",
    excerpt:
      "Two years into the African Continental Free Trade Area, we examine the trade flows, the bureaucratic friction, and the opportunities opening up.",
    category: "politics",
    author: "Kwame Asante",
    authorRole: "Politics Correspondent",
    publishedAt: "2026-06-07T13:00:00Z",
    readMinutes: 11,
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=1600&q=80",
    imageCaption: "Container ship at Tema Port, Ghana",
    tags: ["AfCFTA", "Trade", "Policy"],
  },
  {
    slug: "climate-finance-african-startups",
    title: "Climate Finance Is Flooding Into African Startups — But Not All of It Is Clean",
    excerpt:
      "Green capital is real. So is greenwashing. We tracked $840M in climate-tagged African deals and found a few surprises.",
    category: "innovation",
    author: "Wanjiku Mwangi",
    publishedAt: "2026-06-07T08:45:00Z",
    readMinutes: 9,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    imageCaption: "Solar panel installation in the Sahel",
    tags: ["Climate", "VC", "Greenwashing"],
  },
  {
    slug: "accra-tech-ecosystem-deep-dive",
    title: "Inside Accra's Quiet Tech Boom: The Founders, Funds, and Failed Pivots",
    excerpt:
      "Ghana's capital is becoming West Africa's second tech hub. We profile the operators building it.",
    category: "business",
    author: "Esi Mensah",
    authorRole: "West Africa Bureau",
    publishedAt: "2026-06-06T15:20:00Z",
    readMinutes: 8,
    image: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=1600&q=80",
    imageCaption: "Accra's new tech campus — a co-working scene",
    tags: ["Ghana", "Startups", "Ecosystem"],
  },
  {
    slug: "morocco-world-cup-2030-infrastructure",
    title: "Morocco's World Cup 2030 Build-Out: Stadiums, Rail, and the Cities in Between",
    excerpt:
      "Six host cities. Six billion in infrastructure. We map what's being built — and what the legacy will actually look like.",
    category: "politics",
    author: "Yasmine Bennani",
    publishedAt: "2026-06-06T10:00:00Z",
    readMinutes: 13,
    image: "https://images.unsplash.com/photo-1597212618440-806574debc14?w=1600&q=80",
    imageCaption: "Casablanca skyline with the Hassan II Mosque",
    tags: ["Morocco", "World Cup", "Infrastructure"],
  },
  {
    slug: "nba-african-prospects-2026",
    title: "The 2026 NBA Africa Prospects to Watch",
    excerpt:
      "From the BAL to the lottery — meet the next wave of African hoopers reshaping the league's talent pipeline.",
    category: "sports",
    author: "Tendai Moyo",
    publishedAt: "2026-06-05T18:00:00Z",
    readMinutes: 7,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
    imageCaption: "Basketball Africa League game, packed arena",
    tags: ["NBA", "Basketball", "Talent"],
  },
  {
    slug: "lagos-fashion-week-tech-integration",
    title: "Lagos Fashion Week Is Becoming a Tech Showcase — And the Designers Are Into It",
    excerpt:
      "Runway meets real-time commerce. Inside the integration turning Lagos into a proving ground for fashion-tech.",
    category: "culture",
    author: "Lerato Dlamini",
    publishedAt: "2026-06-05T12:00:00Z",
    readMinutes: 6,
    image: "https://images.unsplash.com/photo-1539109136881-3be06156ac91?w=1600&q=80",
    imageCaption: "Lagos Fashion Week runway, 2026",
    tags: ["Fashion", "Lagos", "Commerce"],
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
