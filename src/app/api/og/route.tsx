import { ImageResponse } from "next/og";

export const runtime = "edge";

const COLORS = {
  midnight: "#0B0B0B",
  ink800: "#141414",
  ink700: "#1C1C1C",
  ink600: "#2A2A2A",
  ink300: "#8A8A8A",
  ink200: "#B8B8B8",
  gold: "#D4AF37",
  emerald: "#008751",
  ivory: "#F4F1E8",
};

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind") || "default";
  const title = url.searchParams.get("title") || "Tracking the Pulse of a Rising Continent";
  const subtitle = url.searchParams.get("subtitle") || "";
  const eyebrow = url.searchParams.get("eyebrow") || "";

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
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Gold left bar */}
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

        {/* Brand header */}
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
              AfricaTrendingHub
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
              {kind.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
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
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1040,
              display: "flex",
            }}
          >
            {truncate(title, 110)}
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
              {truncate(subtitle, 200)}
            </div>
          )}
        </div>

        {/* Footer */}
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
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
