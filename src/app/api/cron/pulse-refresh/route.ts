import { NextRequest, NextResponse } from "next/server";
import { getPulseSnapshot } from "@/lib/pulse";

export const runtime = "nodejs";
export const maxDuration = 60;

// GET /api/cron/pulse-refresh — Vercel Cron warms the in-memory pulse snapshot
// once daily (Hobby plan allows daily crons only) so the first visitors of the
// day get fresh data instead of a cold-start build. Intraday freshness comes
// from on-demand rebuilds: /api/pulse rebuilds when its 15-minute cache
// expires, and Mansa-backed items refresh hourly within that.
// If CRON_SECRET is set, the request must carry it as a Bearer token.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET ?? "";
  if (secret) {
    const auth = req.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  const snapshot = await getPulseSnapshot({ force: true });
  const live = snapshot.items.filter((i) => !i.stale).length;
  return NextResponse.json({
    ok: true,
    fetchedAt: snapshot.fetchedAt,
    liveItems: live,
    totalItems: snapshot.items.length,
  });
}
