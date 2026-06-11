import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/data/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://africa-trending-hub.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AfricaTrendingHub — Tracking the Pulse of a Rising Continent",
    template: "%s — AfricaTrendingHub",
  },
  description:
    "The intelligence network of modern Africa. Real-time data, in-depth reporting, and the stories shaping Africa's future across business, culture, innovation, sports, politics, and music.",
  keywords: [
    "Africa",
    "African news",
    "African startups",
    "African fintech",
    "African culture",
    "African innovation",
    "pan-African",
    "African tech",
    "African venture capital",
    "African business",
  ],
  authors: [{ name: "AfricaTrendingHub" }],
  creator: "AfricaTrendingHub",
  publisher: "AfricaTrendingHub",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "AfricaTrendingHub — Tracking the Pulse of a Rising Continent",
    description: site.description,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "AfricaTrendingHub — Tracking the Pulse of a Rising Continent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfricaTrendingHub",
    description: "Tracking the Pulse of a Rising Continent.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: site.description,
    foundingDate: "2026",
    sameAs: [
      `https://twitter.com/${site.twitter.replace("@", "")}`,
      `https://github.com/MathiasFobi/africa-trending-hub`,
    ],
    knowsAbout: [
      "African startups",
      "African fintech",
      "African culture",
      "African innovation",
      "African venture capital",
      "Pan-African business",
      "Afrobeats",
      "African tech ecosystem",
    ],
    areaServed: {
      "@type": "Place",
      name: "Africa",
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-midnight text-ivory font-sans antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
