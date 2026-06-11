export type Opportunity = {
  slug: string;
  title: string;
  type: "fellowship" | "grant" | "accelerator" | "job" | "competition" | "scholarship";
  org: string;
  region: "Pan-Africa" | "East Africa" | "West Africa" | "North Africa" | "Southern Africa" | "Global";
  deadline: string; // ISO
  amount?: string;
  description: string;
  url?: string;
  tags: string[];
  featured?: boolean;
};

export const opportunities: Opportunity[] = [
  {
    slug: "google-ai-black-founders-fund-2026",
    title: "Google AI Black Founders Fund 2026",
    type: "grant",
    org: "Google for Startups",
    region: "Global",
    deadline: "2026-07-15T23:59:00Z",
    amount: "$150,000 non-dilutive",
    description:
      "Up to $150K in non-dilutive funding, plus Google Cloud credits and AI mentorship for Black-led startups building with AI.",
    url: "https://startups.google.com/",
    tags: ["AI", "Black Founders", "Grant"],
    featured: true,
  },
  {
    slug: "tonyelumelufoundation-leadership-fellowship",
    title: "Tony Elumelu Foundation Entrepreneurship Programme",
    type: "fellowship",
    org: "Tony Elumelu Foundation",
    region: "Pan-Africa",
    deadline: "2026-07-31T23:59:00Z",
    amount: "$5,000 seed + mentorship",
    description:
      "Annual cohort of 1,000 African entrepreneurs. $5K seed capital, 12 weeks of training, mentorship, and global networking.",
    tags: ["Entrepreneurship", "Seed", "Mentorship"],
    featured: true,
  },
  {
    slug: "mest-africa-2026",
    title: "MEST Africa Entrepreneur Training Program 2026",
    type: "accelerator",
    org: "MEST",
    region: "Pan-Africa",
    deadline: "2026-08-15T23:59:00Z",
    amount: "Equity investment up to $100K",
    description:
      "12-month entrepreneur training program in Accra. Successful graduates receive seed funding and access to a global investor network.",
    tags: ["Accelerator", "Tech", "Investment"],
  },
  {
    slug: "acumen-fellow-east-africa",
    title: "Acumen East Africa Fellowship 2026",
    type: "fellowship",
    org: "Acumen",
    region: "East Africa",
    deadline: "2026-09-01T23:59:00Z",
    amount: "Stipend + training",
    description:
      "One-year fellowship for social entrepreneurs in Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. Skills training, mentorship, and field work.",
    tags: ["Social Enterprise", "Leadership"],
  },
  {
    slug: "andela-talent-cloud-engineer",
    title: "Senior Software Engineer — Andela Talent Cloud",
    type: "job",
    org: "Andela",
    region: "Global",
    deadline: "Rolling",
    amount: "Competitive + equity",
    description:
      "Remote-first engineering roles at top global companies. Strong culture, AI training focus, long-term contracts.",
    tags: ["Engineering", "Remote", "AI"],
  },
  {
    slug: "anitadbr-uganda-scholarship",
    title: "Anita Borg Institute — Uganda Computer Science Scholarship",
    type: "scholarship",
    org: "Anita Borg Institute",
    region: "East Africa",
    deadline: "2026-08-30T23:59:00Z",
    amount: "Full tuition + stipend",
    description:
      "Full undergraduate scholarships for women in CS at Makerere University. Mentorship, summer internship placement, and conference travel.",
    tags: ["Women in Tech", "CS", "Education"],
  },
  {
    slug: "ecowas-energy-prize-2026",
    title: "ECOWAS Sustainable Energy Prize 2026",
    type: "competition",
    org: "ECOWAS Centre for Renewable Energy",
    region: "West Africa",
    deadline: "2026-10-15T23:59:00Z",
    amount: "$50,000",
    description:
      "Annual competition for renewable energy solutions in West Africa. Past winners include pay-as-you-go solar and clean cookstove startups.",
    tags: ["Energy", "Climate", "West Africa"],
  },
  {
    slug: "antler-africa-residency",
    title: "Antler Africa Residency",
    type: "accelerator",
    org: "Antler",
    region: "Pan-Africa",
    deadline: "2026-07-22T23:59:00Z",
    amount: "Pre-seed investment + office",
    description:
      "Six-month founder residency in Lagos or Nairobi. Day-zero investment, mentorship from operators, and Demo Day in front of global LPs.",
    tags: ["Pre-seed", "Residency", "Mentorship"],
  },
  {
    slug: "asikana-network-zambia-fellowship",
    title: "Asikana Network — Zambia Tech Policy Fellowship",
    type: "fellowship",
    org: "Asikana Network",
    region: "Southern Africa",
    deadline: "2026-09-20T23:59:00Z",
    amount: "Stipend + travel",
    description:
      "Six-month tech policy fellowship for early-career Zambians. Focus on AI governance, data protection, and digital rights.",
    tags: ["Policy", "AI", "Zambia"],
  },
  {
    slug: "shell-foundation-mobility-prize",
    title: "Shell Foundation LiveWire Mobility Prize",
    type: "grant",
    org: "Shell Foundation / LiveWire",
    region: "Pan-Africa",
    deadline: "2026-08-10T23:59:00Z",
    amount: "$100,000 + venture support",
    description:
      "For startups building EV, e-mobility, or clean transport solutions across the African continent. Non-dilutive grant plus investor introductions.",
    tags: ["Mobility", "EV", "Climate"],
  },
  {
    slug: "savannah-fund-investment-associate",
    title: "Investment Associate — Savannah Fund",
    type: "job",
    org: "Savannah Fund",
    region: "East Africa",
    deadline: "Rolling",
    amount: "Competitive + carry",
    description:
      "Join the team backing East African early-stage startups. Strong deal flow, direct LP exposure, and chance to lead Series A rounds.",
    tags: ["VC", "Investing", "East Africa"],
  },
  {
    slug: "next-einstein-forum-young-scientist",
    title: "Next Einstein Forum — Young Scientist Award",
    type: "competition",
    org: "Next Einstein Forum",
    region: "Pan-Africa",
    deadline: "2026-09-30T23:59:00Z",
    amount: "$25,000 + global platform",
    description:
      "Recognizing Africa's brightest young scientists under 42. Past winners include mathematicians, AI researchers, and biomedical engineers.",
    tags: ["Science", "Research", "Award"],
  },
];

export function getOpportunity(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

export function getActiveOpportunities(): Opportunity[] {
  const now = new Date();
  return opportunities
    .filter((o) => o.deadline === "Rolling" || new Date(o.deadline) >= now)
    .sort((a, b) => {
      if (a.deadline === "Rolling") return -1;
      if (b.deadline === "Rolling") return 1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
}

export function getFeaturedOpportunities(): Opportunity[] {
  return opportunities.filter((o) => o.featured);
}
