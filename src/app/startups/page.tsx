import { StartupsExplorer } from "@/components/startups-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startups — AfricaTrendingHub",
  description:
    "The intelligence layer for African startups. Real-time funding, momentum, and operator data on the companies building Africa's future.",
};

export default function StartupsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <StartupsExplorer />
    </section>
  );
}
