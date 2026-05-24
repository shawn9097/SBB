import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export const PRICE_IDS = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID!,
  volume: process.env.STRIPE_VOLUME_PRICE_ID!,
} as const;
