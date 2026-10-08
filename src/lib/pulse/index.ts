// Builds the pulse snapshot served by /api/pulse.
//
// Strategy (Phase 1, no database yet):
// - Free keyless providers (FX, gold, BTC) refresh on every snapshot build.
// - Mansa API (indices + commodities) is throttled to once per hour because the
//   free tier allows 100 requests/day: 2 calls/hour x 24h = 48/day, leaving
//   headroom for cold starts and on-demand rebuilds.
// - Anything unreachable falls back to the fixture value, marked stale.
// - change% prefers the provider's own day-change figure (Mansa), else compares
//   against the previous snapshot held in module memory; on a cold start it
//   falls back to the fixture value.
// - AFR-VC is derived from our own fundingTrends fixtures (latest quarter vs
//   the one before it), so it stays in sync with the data we publish.
//
// A Vercel cron hits /api/cron/pulse-refresh once daily (Hobby plan limit) to
// warm the snapshot; intraday, the first request after the 15-minute cache
// expires rebuilds it on demand.

import { PULSE_SYMBOLS, type PulseSymbolConfig } from "./config";
import {
  fetchFxRates,
  fetchGoldUsd,
  fetchBtcUsd,
  fetchMansaIndices,
  fetchMansaCommodities,
  mansaValue,
  mansaChangePct,
  matchMansaIndex,
  matchMansaCommodity,
  type MansaIndex,
  type MansaCommodity,
} from "./providers";
import { fundingTrends } from "@/data/startups";

export type PulseItem = {
  symbol: string;
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  change: number; // percent vs previous snapshot
  stale: boolean;
  source: string;
};

export type PulseSnapshot = {
  fetchedAt: string;
  items: PulseItem[];
};

const CACHE_TTL_MS = 15 * 60 * 1000;
const MANSA_TTL_MS = 60 * 60 * 1000;

let cached: PulseSnapshot | null = null;
let cachedAt = 0;

type MansaCache = {
  indices: MansaIndex[] | null;
  commodities: MansaCommodity[] | null;
  fetchedAt: number;
};
let mansaCache: MansaCache | null = null;

function pctChange(now: number, prev: number): number {
  if (!Number.isFinite(now) || !Number.isFinite(prev) || prev === 0) return 0;
  return ((now - prev) / prev) * 100;
}

function vcItem(): { value: number; change: number } {
  const q = fundingTrends;
  const latest = q[q.length - 1];
  const prior = q[q.length - 2];
  const value = latest.total / 1_000_000_000;
  // Quarter-over-quarter change from our own published trend data
  const change = prior ? pctChange(latest.total, prior.total) : 0;
  return { value, change };
}

/** Mansa arg format for indices: "EXCHANGE:hint1,hint2" (e.g. "NGX:ASI,ngx-asi"). */
function parseMansaIndexArg(arg: string | undefined): { exchange: string; hints: string[] } {
  const [exchange = "", rest = ""] = (arg ?? "").split(":");
  return { exchange, hints: rest.split(",").filter(Boolean) };
}

async function getMansaData(): Promise<MansaCache> {
  const now = Date.now();
  if (mansaCache && now - mansaCache.fetchedAt < MANSA_TTL_MS) return mansaCache;
  const [indices, commodities] = await Promise.all([fetchMansaIndices(), fetchMansaCommodities()]);
  // Cache even partial results so one failing endpoint doesn't hammer the quota
  mansaCache = { indices, commodities, fetchedAt: now };
  return mansaCache;
}

async function buildSnapshot(prev: PulseSnapshot | null): Promise<PulseSnapshot> {
  const [fx, gold, btc, mansa] = await Promise.all([
    fetchFxRates(),
    fetchGoldUsd(),
    fetchBtcUsd(),
    getMansaData(),
  ]);
  const prevBySymbol = new Map((prev?.items ?? []).map((i) => [i.symbol, i.value]));

  const items: PulseItem[] = PULSE_SYMBOLS.map((cfg: PulseSymbolConfig) => {
    let value: number | null = null;
    let change: number | null = null;
    let source = "fixture";

    switch (cfg.provider) {
      case "fx":
        if (fx && cfg.arg && typeof fx[cfg.arg] === "number") {
          value = fx[cfg.arg];
          source = "open.er-api.com";
        }
        break;
      case "gold":
        if (gold !== null) {
          value = gold;
          source = "gold-api.com";
        }
        break;
      case "btc":
        if (btc !== null) {
          value = btc;
          source = "coinbase.com";
        }
        break;
      case "mansa_index": {
        const { exchange, hints } = parseMansaIndexArg(cfg.arg);
        const hit = mansa.indices ? matchMansaIndex(mansa.indices, exchange, hints) : null;
        const v = hit ? mansaValue(hit) : null;
        if (v !== null) {
          value = v;
          change = hit ? mansaChangePct(hit) : null;
          source = "mansaapi.com";
        }
        break;
      }
      case "mansa_commodity": {
        const hit = mansa.commodities ? matchMansaCommodity(mansa.commodities, cfg.arg ?? "") : null;
        const v = hit ? mansaValue(hit) : null;
        if (v !== null) {
          value = v;
          change = hit ? mansaChangePct(hit) : null;
          source = "mansaapi.com";
        }
        break;
      }
      case "vc": {
        const vc = vcItem();
        return {
          symbol: cfg.key,
          label: `${cfg.label} (${fundingTrends[fundingTrends.length - 1].quarter})`,
          value: vc.value,
          unit: cfg.unit,
          decimals: cfg.decimals,
          change: vc.change,
          stale: false,
          source: "ath-fixtures",
        };
      }
      case "manual":
        break;
    }

    const stale = value === null;
    const resolved = value ?? cfg.fallback;
    const reference = prevBySymbol.get(cfg.key) ?? cfg.fallback;

    return {
      symbol: cfg.key,
      label: cfg.label,
      value: resolved,
      unit: cfg.unit,
      decimals: cfg.decimals,
      change: change ?? pctChange(resolved, reference),
      stale,
      source,
    };
  });

  return { fetchedAt: new Date().toISOString(), items };
}

export async function getPulseSnapshot(opts: { force?: boolean } = {}): Promise<PulseSnapshot> {
  const now = Date.now();
  if (!opts.force && cached && now - cachedAt < CACHE_TTL_MS) return cached;
  const prev = cached;
  const snapshot = await buildSnapshot(prev);
  cached = snapshot;
  cachedAt = now;
  return snapshot;
}
