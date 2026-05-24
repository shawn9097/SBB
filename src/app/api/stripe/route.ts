import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

// Stripe sends subscription lifecycle events here.
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = supabaseAdmin();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object;
      const tier = sub.items.data[0]?.price.id === process.env.STRIPE_VOLUME_PRICE_ID
        ? "volume"
        : "standard";
      await db
        .from("contractors")
        .update({
          stripe_subscription_id: sub.id,
          subscription_tier: sub.status === "active" ? tier : null,
        })
        .eq("stripe_customer_id", sub.customer as string);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await db
        .from("contractors")
        .update({ stripe_subscription_id: null, subscription_tier: null })
        .eq("stripe_customer_id", sub.customer as string);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
