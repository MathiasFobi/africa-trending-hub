import { ImageResponse } from "next/og";
import { startups } from "@/data/startups";
import { events } from "@/data/events";
import { opportunities } from "@/data/opportunities";
import { articles, getArticle } from "@/data/articles";
import { categories } from "@/data/site";

export const runtime = "edge";
export const alt = "AfricaTrendingHub — Tracking the Pulse of a Rising Continent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_NAME = "AfricaTrendingHub";
const SITE_TAG = "Tracking the Pulse of a Rising Continent";

type Params = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

const COLORS = {
  midnight: "#0B0B0B",
  ink900: "#0B0B0B",
  ink800: "#141414",
  ink700: "#1C1C1C",
  ink600: "#2A2A2A",
  ink500: "#3A3A3A",
  ink300: "#8A8A8A",
  ink200: "#B8B8B8",
  gold: "#D4AF37",
  emerald: "#008751",
  ivory: "#F4F1E8",
  signalUp: "#008751",
};

function fmtMoney(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${n}`;
}

export default async function Image({ searchParams }: Params) {
  const params = await searchParams;
  const kind = (params.kind as string) || "default";
  const title = (params.title as string) || SITE_TAG;
  const subtitle = (params.subtitle as string) || "";
  const eyebrow = (params.eyebrow as string) || "";

  // Brand chrome — present on every card
  const brand = (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 60,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          background: COLORS.gold,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: COLORS.midnight, fontSize: 24, fontWeight: 800 }}>A</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ color: COLORS.ivory, fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>
          {SITE_NAME}
        </span>
        <span
          style={{
            color: COLORS.gold,
            fontSize: 10,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginTop: 2,
          }}
        >
          {kind === "default" ? SITE_TAG : kind.toUpperCase()}
        </span>
      </div>
    </div>
  );

  // Footer — present on every card
  const footer = (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: COLORS.ink300,
        fontSize: 14,
        fontFamily: "monospace",
      }}
    >
      <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
      <span style={{ color: COLORS.gold, display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: COLORS.emerald,
            display: "flex",
          }}
        />
        LIVE · africatrendinghub.com
      </span>
    </div>
  );

  // Default: brand card
  if (kind === "default" || !kind) {
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            background: COLORS.midnight,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            position: "relative",
            fontFamily: "sans-serif",
          }}
        >
          {/* gold/emerald gradient glows */}
          <div
            style={{
              position: "absolute",
              top: -150,
              right: -150,
              width: 600,
              height: 600,
              borderRadius: 9999,
              background: `radial-gradient(circle, ${COLORS.gold}40 0%, transparent 70%)`,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 500,
              height: 500,
              borderRadius: 9999,
              background: `radial-gradient(circle, ${COLORS.emerald}40 0%, transparent 70%)`,
              display: "flex",
            }}
          />

          {brand}

          <div style={{ position: "relative", display: "flex", flexDirection: "column", marginTop: 60 }}>
            <div
              style={{
                color: COLORS.gold,
                fontSize: 16,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: 4,
                marginBottom: 24,
                display: "flex",
              }}
            >
              Bloomberg + TechCrunch + National Geographic
            </div>
            <div
              style={{
                color: COLORS.ivory,
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: -2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ display: "flex" }}>Tracking the Pulse</span>
              <span style={{ display: "flex" }}>of a Rising Continent.</span>
            </div>
            <div
              style={{
                color: COLORS.ink200,
                fontSize: 22,
                marginTop: 28,
                lineHeight: 1.4,
                maxWidth: 950,
                display: "flex",
              }}
            >
              Real-time data, in-depth reporting, and the stories shaping Africa today — across
              business, culture, innovation, sports, politics, and music.
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 36,
                fontSize: 12,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {["Business", "Culture", "Innovation", "Sports", "Politics", "Music"].map((c) => (
                <span
                  key={c}
                  style={{
                    color: COLORS.ivory,
                    border: `1px solid ${COLORS.ink600}`,
                    padding: "8px 14px",
                    borderRadius: 2,
                    display: "flex",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {footer}
        </div>
      ),
      { ...size }
    );
  }

  // Article / event / opportunity / startup: structured card
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: COLORS.midnight,
          display: "flex",
          flexDirection: "column",
          padding: "120px 80px 100px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* gold gradient glow on left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 8,
            height: "100%",
            background: COLORS.gold,
            display: "flex",
          }}
        />

        {brand}

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {eyebrow && (
            <div
              style={{
                color: COLORS.gold,
                fontSize: 14,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 20,
                display: "flex",
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              color: COLORS.ivory,
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1040,
              display: "flex",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                color: COLORS.ink200,
                fontSize: 22,
                marginTop: 24,
                lineHeight: 1.4,
                maxWidth: 950,
                display: "flex",
              }}
            >
              {subtitle.length > 200 ? subtitle.slice(0, 200) + "…" : subtitle}
            </div>
          )}
        </div>

        {footer}
      </div>
    ),
    { ...size }
  );
}
