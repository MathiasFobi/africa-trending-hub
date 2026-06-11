export type Startup = {
  name: string;
  slug: string;
  country: string;
  city: string;
  sector: string;
  stage:
    | "Pre-seed"
    | "Seed"
    | "Series A"
    | "Series B"
    | "Series C"
    | "Series D"
    | "Series E"
    | "Series C+"
    | "Unicorn"
    | "Decacorn";
  totalRaised: number; // USD
  lastRound: number;
  lastRoundDate: string;
  investors: string[];
  description: string;
  status: "Rising" | "Watchlist" | "Steady" | "Struggling" | "Acquired" | "Public";
  momentum: number; // 0-100
  founded: number;
  hq: string;
  tags: string[];
};

export const startups: Startup[] = [
  {
    name: "Flutterwave",
    slug: "flutterwave",
    country: "Nigeria",
    city: "Lagos",
    sector: "Fintech / Payments",
    stage: "Unicorn",
    totalRaised: 475_000_000,
    lastRound: 250_000_000,
    lastRoundDate: "2025-11-12",
    investors: ["Y Combinator", "Tiger Global", "Avenir", "Worldpay"],
    description: "Pan-African payment infrastructure powering commerce across 30+ countries.",
    status: "Rising",
    momentum: 92,
    founded: 2016,
    hq: "Lagos, Nigeria",
    tags: ["Fintech", "Payments", "Y Combinator"],
  },
  {
    name: "Wave",
    slug: "wave",
    country: "Senegal",
    city: "Dakar",
    sector: "Fintech / Mobile Money",
    stage: "Unicorn",
    totalRaised: 291_000_000,
    lastRound: 200_000_000,
    lastRoundDate: "2024-09-18",
    investors: ["Sequoia", "Founders Fund", "Stripe", "Ribbit Capital"],
    description: "Mobile money platform serving 15M+ users across West Africa at sub-1% fees.",
    status: "Rising",
    momentum: 95,
    founded: 2018,
    hq: "Dakar, Senegal",
    tags: ["Fintech", "Mobile Money"],
  },
  {
    name: "M-Kopa",
    slug: "m-kopa",
    country: "Kenya",
    city: "Nairobi",
    sector: "Fintech / Asset Finance",
    stage: "Series C+",
    totalRaised: 195_000_000,
    lastRound: 75_000_000,
    lastRoundDate: "2024-04-22",
    investors: ["Generation Investment", "Standard Bank", "CDC"],
    description: "Pay-as-you-go solar and asset finance for the off-grid African household.",
    status: "Steady",
    momentum: 78,
    founded: 2011,
    hq: "Nairobi, Kenya",
    tags: ["Solar", "Asset Finance", "Climate"],
  },
  {
    name: "Andela",
    slug: "andela",
    country: "Nigeria",
    city: "Lagos",
    sector: "Talent / Engineering",
    stage: "Series E",
    totalRaised: 381_000_000,
    lastRound: 200_000_000,
    lastRoundDate: "2024-02-09",
    investors: ["SoftBank", "Generation", "Chan Zuckerberg"],
    description: "Global engineering talent network with deep African roots — now scaling into AI training data.",
    status: "Rising",
    momentum: 86,
    founded: 2014,
    hq: "Lagos, Nigeria",
    tags: ["Talent", "AI"],
  },
  {
    name: "Chipper Cash",
    slug: "chipper-cash",
    country: "Ghana",
    city: "Accra",
    sector: "Fintech / Cross-border",
    stage: "Unicorn",
    totalRaised: 305_000_000,
    lastRound: 150_000_000,
    lastRoundDate: "2023-11-30",
    investors: ["SVB Capital", "Deciens Capital", "Ribbit Capital"],
    description: "Cross-border payments for African consumers and SMBs across 20+ countries.",
    status: "Steady",
    momentum: 71,
    founded: 2018,
    hq: "Accra, Ghana",
    tags: ["Fintech", "Cross-border"],
  },
  {
    name: "Kuda Bank",
    slug: "kuda-bank",
    country: "Nigeria",
    city: "Lagos",
    sector: "Fintech / Digital Bank",
    stage: "Series B",
    totalRaised: 91_000_000,
    lastRound: 55_000_000,
    lastRoundDate: "2024-08-14",
    investors: ["Tencent", "Ridge Ventures", "Valar"],
    description: "Mobile-first digital bank with 5M+ users in Nigeria and the UK.",
    status: "Rising",
    momentum: 84,
    founded: 2019,
    hq: "Lagos, Nigeria",
    tags: ["Banking", "Mobile"],
  },
  {
    name: "BasiGo",
    slug: "basigo",
    country: "Kenya",
    city: "Nairobi",
    sector: "Mobility / EV",
    stage: "Series A",
    totalRaised: 32_000_000,
    lastRound: 24_000_000,
    lastRoundDate: "2025-06-05",
    investors: ["Climate Capital", "Novastar", "EDF"],
    description: "Electric bus manufacturer and operator for African public transport.",
    status: "Rising",
    momentum: 88,
    founded: 2020,
    hq: "Nairobi, Kenya",
    tags: ["EV", "Mobility", "Climate"],
  },
  {
    name: "MFS Africa (Onafriq)",
    slug: "onafriq",
    country: "South Africa",
    city: "Cape Town",
    sector: "Fintech / Payments",
    stage: "Series C+",
    totalRaised: 250_000_000,
    lastRound: 100_000_000,
    lastRoundDate: "2025-03-20",
    investors: ["Equity Group", "Goodwell", "Lateral Capital"],
    description: "Pan-African mobile money interoperability network (now Onafriq) — 500M+ wallets connected.",
    status: "Steady",
    momentum: 80,
    founded: 2009,
    hq: "Cape Town, South Africa",
    tags: ["Fintech", "Infrastructure"],
  },
  {
    name: "Wasoko",
    slug: "wasoko",
    country: "Kenya",
    city: "Nairobi",
    sector: "B2B / E-commerce",
    stage: "Series B",
    totalRaised: 165_000_000,
    lastRound: 125_000_000,
    lastRoundDate: "2024-12-04",
    investors: ["Tiger Global", "Avenir", "Goldman Sachs"],
    description: "B2B e-commerce and logistics platform serving informal retailers across East Africa.",
    status: "Struggling",
    momentum: 52,
    founded: 2018,
    hq: "Nairobi, Kenya",
    tags: ["B2B", "Logistics"],
  },
  {
    name: "TymeBank",
    slug: "tymebank",
    country: "South Africa",
    city: "Johannesburg",
    sector: "Fintech / Digital Bank",
    stage: "Series C+",
    totalRaised: 290_000_000,
    lastRound: 70_000_000,
    lastRoundDate: "2025-09-15",
    investors: ["Apis Partners", "Ethos", "Black Dragon Capital"],
    description: "Digital retail bank serving 10M+ customers in South Africa with expansion across Southeast Asia.",
    status: "Rising",
    momentum: 82,
    founded: 2015,
    hq: "Johannesburg, South Africa",
    tags: ["Banking", "Digital"],
  },
];

export const fundingTrends = [
  { quarter: "Q1 2024", total: 1_200_000_000, deals: 142 },
  { quarter: "Q2 2024", total: 1_450_000_000, deals: 168 },
  { quarter: "Q3 2024", total: 1_800_000_000, deals: 191 },
  { quarter: "Q4 2024", total: 2_100_000_000, deals: 215 },
  { quarter: "Q1 2025", total: 1_950_000_000, deals: 198 },
  { quarter: "Q2 2025", total: 2_400_000_000, deals: 234 },
  { quarter: "Q3 2025", total: 2_650_000_000, deals: 261 },
  { quarter: "Q4 2025", total: 3_100_000_000, deals: 287 },
  { quarter: "Q1 2026", total: 2_850_000_000, deals: 256 },
];

export const sectorBreakdown = [
  { sector: "Fintech", amount: 4_200_000_000, share: 38 },
  { sector: "Mobility", amount: 1_400_000_000, share: 13 },
  { sector: "AgriTech", amount: 980_000_000, share: 9 },
  { sector: "HealthTech", amount: 870_000_000, share: 8 },
  { sector: "Logistics", amount: 720_000_000, share: 7 },
  { sector: "EdTech", amount: 540_000_000, share: 5 },
  { sector: "Climate", amount: 1_100_000_000, share: 10 },
  { sector: "AI / Data", amount: 690_000_000, share: 6 },
  { sector: "Other", amount: 500_000_000, share: 4 },
];
