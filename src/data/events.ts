export type EventItem = {
  slug: string;
  title: string;
  city: string;
  country: string;
  venue: string;
  category: "tech" | "culture" | "music" | "business" | "politics" | "sport" | "climate";
  startDate: string; // ISO
  endDate?: string;
  price: "Free" | "$" | "$$" | "$$$";
  hostedBy: string;
  description: string;
  url?: string;
  featured?: boolean;
};

export const events: EventItem[] = [
  {
    slug: "techcabal-max-2026-lagos",
    title: "TechCabal MAX 2026",
    city: "Lagos",
    country: "Nigeria",
    venue: "Eko Hotel & Suites, Victoria Island",
    category: "tech",
    startDate: "2026-06-19T09:00:00Z",
    endDate: "2026-06-20T18:00:00Z",
    price: "$$",
    hostedBy: "TechCabal",
    description:
      "Two days of deep-dive sessions on African fintech, AI policy, and the next wave of cross-border commerce. 80+ speakers, 1,500 attendees.",
    featured: true,
  },
  {
    slug: "afro-pitch-accra",
    title: "AfroPitch Accra: Climate Edition",
    city: "Accra",
    country: "Ghana",
    venue: "Impact Hub Accra",
    category: "climate",
    startDate: "2026-06-25T10:00:00Z",
    price: "Free",
    hostedBy: "AfroPitch",
    description:
      "Pitch competition for 12 early-stage climate-tech startups. $250K in non-dilutive prize capital. Live audience voting + investor panels.",
  },
  {
    slug: "lagos-fashion-week-june",
    title: "Lagos Fashion Week — June Edition",
    city: "Lagos",
    country: "Nigeria",
    venue: "Federal Palace Hotel",
    category: "culture",
    startDate: "2026-06-27T18:00:00Z",
    endDate: "2026-06-28T23:00:00Z",
    price: "$$",
    hostedBy: "Lagos Fashion Week",
    description:
      "Runway + showroom format featuring 30+ designers. Live-streamed commerce integration. Side events on sustainable sourcing.",
  },
  {
    slug: "nairobi-blockchain-summit",
    title: "Nairobi Blockchain & Digital Assets Summit",
    city: "Nairobi",
    country: "Kenya",
    venue: "Sarit Centre",
    category: "tech",
    startDate: "2026-07-02T09:00:00Z",
    price: "$",
    hostedBy: "Africa Blockchain Association",
    description:
      "Regulatory deep-dive with Capital Markets Authority of Kenya, plus tokenization case studies from Kenyan real estate and agricultural supply chains.",
  },
  {
    slug: "cape-town-international-jazz-fest",
    title: "Cape Town International Jazz Festival",
    city: "Cape Town",
    country: "South Africa",
    venue: "CTICC",
    category: "music",
    startDate: "2026-07-11T17:00:00Z",
    endDate: "2026-07-12T23:00:00Z",
    price: "$$",
    hostedBy: "CTIJF",
    description:
      "Two stages, 30+ artists, 15,000 attendees. The largest jazz festival on the continent featuring both global headliners and South African rising stars.",
    featured: true,
  },
  {
    slug: "africa-climate-summit-addis",
    title: "Africa Climate Summit 2026",
    city: "Addis Ababa",
    country: "Ethiopia",
    venue: "African Union Headquarters",
    category: "politics",
    startDate: "2026-09-08T08:00:00Z",
    endDate: "2026-09-10T18:00:00Z",
    price: "Free",
    hostedBy: "African Union Commission",
    description:
      "Continental climate finance framework negotiations, $30B adaptation fund commitments, and the launch of the Africa Carbon Markets Initiative Phase II.",
  },
  {
    slug: "invest-in-africa-cape-town",
    title: "Invest in Africa Summit",
    city: "Cape Town",
    country: "South Africa",
    venue: "Cape Town International Convention Centre",
    category: "business",
    startDate: "2026-09-15T08:00:00Z",
    endDate: "2026-09-17T18:00:00Z",
    price: "$$$",
    hostedBy: "Africa Investment Forum",
    description:
      "Pension funds, DFIs, and family offices meet Series B+ African founders. Closed-door deal rooms, structured matchmaking, and policy roundtables.",
  },
  {
    slug: "accra-anime-cosplay-fest",
    title: "Accra Anime & Cosplay Festival",
    city: "Accra",
    country: "Ghana",
    venue: "Accra International Conference Centre",
    category: "culture",
    startDate: "2026-06-22T11:00:00Z",
    price: "$",
    hostedBy: "Otaku Ghana",
    description:
      "Pop culture, Afrofuturism, and anime aesthetics collide. Cosplay competitions, artist alleys, and panel discussions on African animation.",
  },
  {
    slug: "dakar-art-biennale",
    title: "Dak'Art Biennale — Off Program",
    city: "Dakar",
    country: "Senegal",
    venue: "Off-venue across Plateau",
    category: "culture",
    startDate: "2026-11-08T10:00:00Z",
    endDate: "2026-12-08T22:00:00Z",
    price: "Free",
    hostedBy: "Dak'Art",
    description:
      "The continent's most prestigious contemporary art event, with 80+ off-program exhibitions across Dakar's Plateau district.",
  },
  {
    slug: "marrakech-fusion-festival",
    title: "Marrakech Fusion Festival",
    city: "Marrakech",
    country: "Morocco",
    venue: "El Badi Palace",
    category: "music",
    startDate: "2026-08-15T19:00:00Z",
    endDate: "2026-08-17T23:00:00Z",
    price: "$$",
    hostedBy: "Fusion Morocco",
    description:
      "Gnawa meets jazz meets electronic at the foot of the Atlas Mountains. Three nights of cross-cultural collaboration in a 16th-century ruin.",
  },
  {
    slug: "african-basketball-league-finals",
    title: "BAL Season 5 Finals",
    city: "Kigali",
    country: "Rwanda",
    venue: "BK Arena",
    category: "sport",
    startDate: "2026-06-28T18:00:00Z",
    price: "$$",
    hostedBy: "Basketball Africa League",
    description:
      "The NBA-backed continental basketball championship finals. Eight finalists, two days of playoff action, and a major NBA Africa announcement.",
    featured: true,
  },
  {
    slug: "kigali-ai-summit",
    title: "Kigali AI & Compute Summit",
    city: "Kigali",
    country: "Rwanda",
    venue: "Kigali Convention Centre",
    category: "tech",
    startDate: "2026-07-22T09:00:00Z",
    price: "$$",
    hostedBy: "Rwanda Ministry of ICT",
    description:
      "Compute infrastructure, language model training, and Rwanda's national AI strategy launch. Closed-door with government + hyperscalers.",
  },
];

export function getEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): EventItem[] {
  return events.filter((e) => e.featured);
}

export function getUpcomingEvents(limit?: number): EventItem[] {
  const now = new Date();
  const sorted = events
    .filter((e) => new Date(e.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getByCategory(cat: EventItem["category"]): EventItem[] {
  return events.filter((e) => e.category === cat);
}
