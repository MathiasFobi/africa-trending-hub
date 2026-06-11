import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opportunities — AfricaTrendingHub",
  description:
    "Fellowships, grants, accelerators, jobs, competitions, and scholarships across the African continent.",
};

export default function OpportunitiesPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <OpportunitiesExplorer />
    </section>
  );
}
