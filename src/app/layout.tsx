import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

export const metadata: Metadata = {
  title: "AfricaTrendingHub — Tracking the Pulse of a Rising Continent",
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
  ],
  authors: [{ name: "AfricaTrendingHub" }],
  openGraph: {
    title: "AfricaTrendingHub — Tracking the Pulse of a Rising Continent",
    description:
      "Bloomberg + TechCrunch + National Geographic for Africa. Real-time data, in-depth reporting, and the stories shaping a rising continent.",
    type: "website",
    siteName: "AfricaTrendingHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfricaTrendingHub",
    description: "Tracking the Pulse of a Rising Continent.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-midnight text-ivory font-sans antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
