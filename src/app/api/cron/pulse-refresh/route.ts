import { NextRequest, NextResponse } from "next/server";
import { getPulseSnapshot } from "@/lib/pulse";

export const runtime = "nodejs";
export const maxDuration = 60;

// GET /api/cron/pulse-refresh — Vercel Cron warms the in-memory pulse snapshot
// every 15 minutes so visitors get fresh data instead of a cold-start build.
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
