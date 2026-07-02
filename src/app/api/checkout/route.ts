import { NextRequest, NextResponse } from "next/server";
import { stripe, priceIdForTier } from "@/lib/stripe";
import type { SubscriptionTier } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Creates a Stripe Checkout Session for the logged-in contractor's chosen plan
// and returns the hosted checkout URL. The contractor is linked back to the
// Stripe customer in the webhook (checkout.session.completed).
export async function POST(req: NextRequest) {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let tier: SubscriptionTier;
  try {
    const body = (await req.json()) as { tier?: string };
    if (body.tier !== "standard" && body.tier !== "volume") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    tier = body.tier;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data: contractor } = await db
    .from("contractors")
    .select("id, email, stripe_customer_id, subscription_tier")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!contractor) {
    return NextResponse.json(
      { error: "Finish onboarding before choosing a plan" },
      { status: 409 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Guard against a tier whose Stripe price isn't configured (e.g. Volume before
  // its product exists) — otherwise Stripe would receive an undefined price.
  const priceId = priceIdForTier(tier);
  if (!priceId) {
    return NextResponse.json({ error: "That plan isn't available yet" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: contractor.id,
    // Reuse an existing customer if we've seen them before; otherwise let
    // Checkout create one keyed to their email.
    ...(contractor.stripe_customer_id
      ? { customer: contractor.stripe_customer_id }
      : { customer_email: contractor.email }),
    subscription_data: { metadata: { contractor_id: contractor.id } },
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/dashboard?checkout=cancelled`,
    allow_promotion_codes: true,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
