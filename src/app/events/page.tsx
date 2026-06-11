import { EventsExplorer } from "@/components/events-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — AfricaTrendingHub",
  description:
    "The African events calendar — conferences, festivals, summits, and convenings across the continent.",
};

export default function EventsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <EventsExplorer />
    </section>
  );
}
