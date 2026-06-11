import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AfricaTrendingHub",
    short_name: "Africa Trending",
    description: "Tracking the Pulse of a Rising Continent",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0B",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
