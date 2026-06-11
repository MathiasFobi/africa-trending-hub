import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "AfricaTrendingHub — Tracking the Pulse of a Rising Continent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

export default async function Image() {
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
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Gold radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${COLORS.gold}50 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        {/* Emerald radial glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${COLORS.emerald}50 0%, transparent 70%)`,
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
              width: 48,
              height: 48,
              background: COLORS.gold,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: COLORS.midnight, fontSize: 28, fontWeight: 800 }}>A</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: COLORS.ivory, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
              AfricaTrendingHub
            </span>
            <span
              style={{
                color: COLORS.gold,
                fontSize: 11,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginTop: 3,
              }}
            >
              Tracking the Pulse of a Rising Continent
            </span>
          </div>
        </div>

        {/* Main content */}
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
              fontSize: 80,
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
            Real-time data, in-depth reporting, and the stories shaping Africa today.
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
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
    { ...size }
  );
}
