import type { MetadataRoute } from "next";
import { startups } from "@/data/startups";
import { events } from "@/data/events";
import { opportunities } from "@/data/opportunities";
import { articles } from "@/data/articles";
import { categories } from "@/data/site";
import { videoPlaylists } from "@/data/videos";

const SITE_URL = "https://africa-trending-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "hourly", priority: 1.0 },
    { url: `${SITE_URL}/pulse`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE_URL}/startups`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/events`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/opportunities`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/watch`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Category pages (6)
  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // Articles (12) — now with real detail pages
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Startups (10) — now with real detail pages
  const startupPages: MetadataRoute.Sitemap = startups.map((s) => ({
    url: `${SITE_URL}/startups/${s.slug}`,
    lastModified: new Date(s.lastRoundDate),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Events (12) — now with real detail pages
  const eventPages: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: new Date(e.startDate),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Opportunities (12) — now with real detail pages
  const opportunityPages: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${SITE_URL}/opportunities/${o.slug}`,
    lastModified: o.deadline === "Rolling" ? now : new Date(o.deadline),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Video playlists (6 channels)
  const videoPages: MetadataRoute.Sitemap = videoPlaylists.map((v) => ({
    url: `${SITE_URL}/watch/${v.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...articlePages,
    ...startupPages,
    ...eventPages,
    ...opportunityPages,
    ...videoPages,
  ];
}
