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
