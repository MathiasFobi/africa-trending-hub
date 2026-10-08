// Pulse data-source configuration.
//
// Phase 1: FX, gold and BTC come from free, keyless endpoints (verified Oct 2026).
// African equity indices and Brent have no reliable free keyless feed, so they
// serve fixture values marked stale until a market-data provider is configured
// (see UPGRADE_PATH below).

export type PulseProvider = "fx" | "gold" | "btc" | "vc" | "mansa_index" | "mansa_commodity" | "manual";

export type PulseSymbolConfig = {
  key: string;
  label: string;
  unit?: string;
  decimals?: number;
  provider: PulseProvider;
  /** provider-specific arg: ISO currency code for fx, match spec for mansa */
  arg?: string;
  /** last-known fixture value used when the provider is unreachable */
  fallback: number;
};

// UPGRADE_PATH: mansa providers are live once MANSA_API_KEY is set. Any symbol
// whose provider data can't be fetched stays on its fixture value, marked stale.
// --- African equity indices (live via Mansa) ---
export const PULSE_SYMBOLS: PulseSymbolConfig[] = [
  { key: "NGX", label: "Nigerian Stock Exchange", decimals: 0, provider: "mansa_index", arg: "NGX:ASI,ngx-asi", fallback: 102_485 },
  { key: "JSE", label: "Johannesburg SE", decimals: 0, provider: "mansa_index", arg: "JSE:jse-asi", fallback: 78_241 },
  { key: "BRVM", label: "BRVM (West Africa)", decimals: 1, provider: "mansa_index", arg: "BRVM:brvm-ci,brvm10", fallback: 286 },
  { key: "USE", label: "Uganda SE", decimals: 0, provider: "mansa_index", arg: "USE:use-asi", fallback: 1_412 },
  { key: "EGX30", label: "Egypt EGX30", decimals: 0, provider: "mansa_index", arg: "EGX:egx-30,egx30", fallback: 31_204 },
  // --- FX (live, open.er-api.com, free, no key) ---
  { key: "USD/NGN", label: "US Dollar / Naira", decimals: 0, provider: "fx", arg: "NGN", unit: "₦", fallback: 1_485 },
  { key: "USD/KES", label: "US Dollar / Shilling", decimals: 1, provider: "fx", arg: "KES", unit: "KSh", fallback: 129.4 },
  { key: "USD/ZAR", label: "US Dollar / Rand", decimals: 2, provider: "fx", arg: "ZAR", unit: "R", fallback: 18.32 },
  // --- Crypto & commodities ---
  { key: "BTC", label: "Bitcoin", decimals: 0, provider: "btc", unit: "$", fallback: 108_420 },
  { key: "GOLD", label: "Gold (oz)", decimals: 0, provider: "gold", unit: "$", fallback: 4_217 },
  { key: "OIL", label: "Brent Crude", decimals: 2, provider: "mansa_commodity", arg: "brent", unit: "$", fallback: 94.18 },
  // --- African VC (derived from our own funding fixtures) ---
  { key: "AFR-VC", label: "African VC", decimals: 2, provider: "vc", unit: "$B", fallback: 2.85 },
];
