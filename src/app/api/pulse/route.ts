import { NextResponse } from "next/server";
import { getPulseSnapshot, getLastMansaDiagnostics } from "@/lib/pulse";

export const runtime = "nodejs";
export const maxDuration = 30;

// GET /api/pulse — live market snapshot for the Pulse ticker.
// Cached in memory for 15 minutes; falls back to fixture values per symbol
// when a provider is unreachable (items carry stale: true).
// GET /api/pulse?debug=1 — same snapshot plus Mansa match diagnostics
// (which tracked symbols matched which Mansa records), at no extra quota cost.
export async function GET(req: Request) {
  try {
    const debug = new URL(req.url).searchParams.get("debug") === "1";
    const snapshot = await getPulseSnapshot();
    const body = debug
      ? { ...snapshot, debug: { mansa: getLastMansaDiagnostics() } }
      : snapshot;
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Pulse snapshot unavailable", detail: String(err) },
      { status: 502 }
    );
  }
}
