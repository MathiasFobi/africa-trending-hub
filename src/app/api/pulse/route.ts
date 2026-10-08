import { NextResponse } from "next/server";
import { getPulseSnapshot } from "@/lib/pulse";

export const runtime = "nodejs";
export const maxDuration = 30;

// GET /api/pulse — live market snapshot for the Pulse ticker.
// Cached in memory for 15 minutes; falls back to fixture values per symbol
// when a provider is unreachable (items carry stale: true).
export async function GET() {
  try {
    const snapshot = await getPulseSnapshot();
    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Pulse snapshot unavailable", detail: String(err) },
      { status: 502 }
    );
  }
}
