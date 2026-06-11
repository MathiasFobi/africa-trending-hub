export const site = {
  name: "AfricaTrendingHub",
  tagline: "Tracking the Pulse of a Rising Continent",
  description:
    "The intelligence network of modern Africa. Real-time data, in-depth reporting, and the stories shaping Africa's future.",
  url: "https://africatrendinghub.com",
  twitter: "@africatrending",
  email: "hello@africatrendinghub.com",
} as const;

export const categories = [
  { slug: "business", label: "Business & Fintech", color: "emerald", accent: "African fintech, venture capital, market moves" },
  { slug: "culture", label: "Culture", color: "gold", accent: "Art, music, fashion, identity, diaspora" },
  { slug: "innovation", label: "Innovation", color: "ivory", accent: "AI, deep tech, climate, mobility" },
  { slug: "sports", label: "Sports", color: "emerald", accent: "Football, athletics, NBA, esports" },
  { slug: "politics", label: "Politics", color: "gold", accent: "Policy, elections, geopolitics, governance" },
  { slug: "music", label: "Music", color: "ivory", accent: "Afrobeats, amapiano, hip-hop, festivals" },
] as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/pulse", label: "Pulse" },
  { href: "/startups", label: "Startups" },
  { href: "/events", label: "Events" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/watch", label: "Watch" },
  ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.label })),
] as const;

export type Category = (typeof categories)[number];
