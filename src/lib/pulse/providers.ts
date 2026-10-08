// Low-level fetchers for live pulse data. Each returns a raw number or null.
// All endpoints are free and keyless (verified Oct 2026). 8s timeout each so
// one slow provider can't hold up the whole snapshot.

const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "User-Agent": "AfricaTrendingHub-Pulse/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
}

/** USD-based FX rates: { NGN: 1330.2, KES: 129.6, ... } or null. */
export async function fetchFxRates(): Promise<Record<string, number> | null> {
  try {
    const data = (await fetchJson("https://open.er-api.com/v6/latest/USD")) as {
      result?: string;
      rates?: Record<string, number>;
    };
    if (data.result !== "success" || !data.rates) return null;
    return data.rates;
  } catch {
    return null;
  }
}

/** Gold spot price in USD/oz or null. */
export async function fetchGoldUsd(): Promise<number | null> {
  try {
    const data = (await fetchJson("https://api.gold-api.com/price/XAU")) as {
      price?: number;
    };
    return typeof data.price === "number" && data.price > 0 ? data.price : null;
  } catch {
    return null;
  }
}

/** BTC spot price in USD or null. */
export async function fetchBtcUsd(): Promise<number | null> {
  try {
    const data = (await fetchJson("https://api.coinbase.com/v2/prices/BTC-USD/spot")) as {
      data?: { amount?: string };
    };
    const n = Number(data.data?.amount);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

// ============================================================================
// Mansa API (https://mansaapi.com) — African market indices + commodities.
// Free tier: 100 requests/day, keyless endpoints above are unlimited, so Mansa
// calls are throttled separately (see index.ts) to stay well under budget.
// Auth: Authorization: Bearer <MANSA_API_KEY>.
// ============================================================================

const MANSA_BASE = "https://mansaapi.com/api/v1";

function mansaKey(): string {
  return process.env.MANSA_API_KEY ?? "";
}

async function fetchMansa<T>(path: string): Promise<T | null> {
  const key = mansaKey();
  if (!key) return null;
  try {
    const res = await fetch(`${MANSA_BASE}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${key}`,
        "User-Agent": "AfricaTrendingHub-Pulse/1.0",
      },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success?: boolean; data?: T };
    if (body.success !== true || body.data == null) return null;
    return body.data;
  } catch {
    return null;
  }
}

export type MansaIndex = {
  code?: string;
  slug?: string;
  name?: string;
  exchange?: string;
  exchange_code?: string;
  currency?: string;
  value?: number;
  currentPrice?: number;
  change_pct?: number;
  changePercentage?: number;
  updated_at?: string;
};

export type MansaCommodity = {
  code?: string;
  slug?: string;
  name?: string;
  value?: number;
  price?: number;
  currentPrice?: number;
  change_pct?: number;
  changePercentage?: number;
  unit?: string;
};

function num(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : (v as number);
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? n : null;
}

/** All tracked African indices, or null when the key is missing/unreachable. */
export async function fetchMansaIndices(): Promise<MansaIndex[] | null> {
  const data = await fetchMansa<MansaIndex[] | Record<string, MansaIndex>>("/markets/indices");
  if (!data) return null;
  return Array.isArray(data) ? data : Object.values(data);
}

/** Commodity prices relevant to African producers/traders, or null. */
export async function fetchMansaCommodities(): Promise<MansaCommodity[] | null> {
  const data = await fetchMansa<MansaCommodity[] | Record<string, MansaCommodity>>(
    "/markets/commodities"
  );
  if (!data) return null;
  return Array.isArray(data) ? data : Object.values(data);
}

/** Normalized value from a Mansa index/commodity record. */
export function mansaValue(item: { value?: number; currentPrice?: number; price?: number }): number | null {
  return num(item.value) ?? num(item.currentPrice) ?? num(item.price);
}

/** Normalized day-change percent from a Mansa record. */
export function mansaChangePct(item: { change_pct?: number | string; changePercentage?: number | string }): number | null {
  const n = num(item.change_pct) ?? num(item.changePercentage);
  // num() rejects negatives; change can be negative — parse separately
  if (n !== null) return n;
  for (const raw of [item.change_pct, item.changePercentage]) {
    const v = typeof raw === "string" ? Number(raw) : raw;
    if (typeof v === "number" && Number.isFinite(v)) return v;
  }
  return null;
}

function norm(s: string | undefined): string {
  return (s ?? "").toLowerCase();
}

function alnum(s: string | undefined): string {
  return norm(s).replace(/[^a-z0-9]/g, "");
}

/** Exchange identifier for an index record (handles field-name variants). */
function indexExchange(i: MansaIndex): string {
  return norm(i.exchange) || norm(i.exchange_code);
}

/**
 * Find the best-matching index for an exchange.
 * Pass 1: strict — record's exchange field equals the requested code.
 * Pass 2: loose — exchange code appears as a prefix in code/slug or in the name
 * (covers lists that omit the exchange field or use variants like "NIGERIA").
 * Within the pool, prefers a code-hint match (e.g. ngx-asi), then an
 * "all share" benchmark. Returns null rather than a wrong-exchange index.
 */
export function matchMansaIndex(
  indices: MansaIndex[],
  exchange: string,
  codeHints: string[]
): MansaIndex | null {
  const ex = norm(exchange);
  const exA = alnum(exchange);

  let pool = indices.filter((i) => indexExchange(i) === ex);
  if (pool.length === 0 && exA) {
    pool = indices.filter((i) => {
      const code = alnum(i.code);
      const slug = alnum(i.slug);
      return code.startsWith(exA) || slug.startsWith(exA) || norm(i.name).includes(ex);
    });
  }
  if (pool.length === 0) return null;

  for (const hint of codeHints) {
    const h = hint.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!h) continue;
    const hit = pool.find((i) => alnum(i.code) === h || alnum(i.slug) === h);
    if (hit) return hit;
  }
  const allShare = pool.find((i) => /all[\s-]?share/.test(norm(i.name)));
  if (allShare) return allShare;
  return null;
}

/** Find a commodity by name/code substring, e.g. "brent". */
export function matchMansaCommodity(
  commodities: MansaCommodity[],
  hint: string
): MansaCommodity | null {
  const h = norm(hint);
  return (
    commodities.find(
      (c) => norm(c.name).includes(h) || norm(c.code).includes(h) || norm(c.slug).includes(h)
    ) ?? null
  );
}
