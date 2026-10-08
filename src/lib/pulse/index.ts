// Builds the pulse snapshot served by /api/pulse.
//
// Strategy (Phase 1, no database yet):
// - Fetch live values from free providers, each with an 8s timeout.
// - Anything unreachable falls back to the fixture value, marked stale.
// - change% is computed against the previous snapshot held in module memory;
//   on a cold start it falls back to comparing against the fixture value, so
//   the first response after a deploy shows ~0% change rather than garbage.
// - AFR-VC is derived from our own fundingTrends fixtures (latest quarter vs
//   the one before it), so it stays in sync with the data we publish.
//
// A Vercel cron hits /api/cron/pulse-refresh every 15 minutes to keep the
// in-memory snapshot warm; if the instance is cold, the first request builds
// it on demand.

import { PULSE_SYMBOLS, type PulseSymbolConfig } from "./config";
import { fetchFxRates, fetchGoldUsd, fetchBtcUsd } from "./providers";
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
let cached: PulseSnapshot | null = null;
let cachedAt = 0;

function pctChange(now: number, prev: number): number {
  if (!Number.isFinite(now) || !Number.isFinite(prev) || prev === 0) return 0;
  return ((now - prev) / prev) * 100;
}

function vcItem(prevSnapshot: PulseSnapshot | null): { value: number; change: number } {
  const q = fundingTrends;
  const latest = q[q.length - 1];
  const prior = q[q.length - 2];
  const value = latest.total / 1_000_000_000;
  // Quarter-over-quarter change from our own published trend data
  const change = prior ? pctChange(latest.total, prior.total) : 0;
  void prevSnapshot;
  return { value, change };
}

async function buildSnapshot(prev: PulseSnapshot | null): Promise<PulseSnapshot> {
  const [fx, gold, btc] = await Promise.all([fetchFxRates(), fetchGoldUsd(), fetchBtcUsd()]);
  const prevBySymbol = new Map((prev?.items ?? []).map((i) => [i.symbol, i.value]));

  const items: PulseItem[] = PULSE_SYMBOLS.map((cfg: PulseSymbolConfig) => {
    let value: number | null = null;
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
      case "vc": {
        const vc = vcItem(prev);
        value = vc.value;
        source = "ath-fixtures";
        const reference = prevBySymbol.get(cfg.key) ?? cfg.fallback;
        return {
          symbol: cfg.key,
          label: `${cfg.label} (${fundingTrends[fundingTrends.length - 1].quarter})`,
          value,
          unit: cfg.unit,
          decimals: cfg.decimals,
          change: vc.change,
          stale: false,
          source,
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
      change: pctChange(resolved, reference),
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
