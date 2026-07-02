import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export const PRICE_IDS = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID!,
  volume: process.env.STRIPE_VOLUME_PRICE_ID!,
} as const;

export type SubscriptionTier = "standard" | "volume";

export function priceIdForTier(tier: SubscriptionTier): string {
  return tier === "volume" ? PRICE_IDS.volume : PRICE_IDS.standard;
}

export function tierForPriceId(priceId: string | undefined): SubscriptionTier {
  return priceId === PRICE_IDS.volume ? "volume" : "standard";
}
