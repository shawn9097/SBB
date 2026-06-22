import type { TradeNiche } from "@/types";

export const TRADE_NICHES: TradeNiche[] = [
  "roofing",
  "hvac",
  "painting",
  "kitchen_bath",
  "landscaping",
  "fencing",
];

export function isTradeNiche(value: unknown): value is TradeNiche {
  return typeof value === "string" && TRADE_NICHES.includes(value as TradeNiche);
}

// Turn a company name into a clean local-part slug, e.g. "Mike's Roofing Co." -> "mikes-roofing-co"
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
}

// Generate a candidate unique BCC address for a contractor, e.g. "mikes-roofing-a4f9@warmside.app".
// The random suffix keeps it unique even when two contractors share a company name; the caller
// is responsible for retrying on the (rare) unique-constraint collision.
export function generateInboundAddress(companyName: string): string {
  const domain = process.env.INBOUND_EMAIL_DOMAIN || "warmside.app";
  const base = slugify(companyName) || "contractor";
  const suffix = Math.random().toString(16).slice(2, 6);
  return `${base}-${suffix}@${domain}`;
}

// Split a free-text textarea into individual entries. Blank lines separate entries so that
// multi-line emails stay intact, while a list of short texts (one per line) also works.
export function parseEntries(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(/\n\s*\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}
