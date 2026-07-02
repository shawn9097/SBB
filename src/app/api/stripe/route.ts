import { NextRequest, NextResponse } from "next/server";
import { stripe, tierForPriceId } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import type Stripe from "stripe";

// Stripe sends subscription lifecycle events here.
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = supabaseAdmin();

  switch (event.type) {
    // Fires once when a contractor completes checkout. This is where we bind the
    // Stripe customer to the contractor record — every later subscription event
    // matches on stripe_customer_id, so this link has to be set first.
    case "checkout.session.completed": {
      const session = event.data.object;
      const contractorId = session.client_reference_id;
      const customerId = session.customer as string | null;
      if (contractorId && customerId) {
        const update: Record<string, unknown> = { stripe_customer_id: customerId };
        // Set the tier immediately so activation doesn't depend on the
        // subscription.created event winning a race with this one.
        if (session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          update.stripe_subscription_id = sub.id;
          if (sub.status === "active" || sub.status === "trialing") {
            update.subscription_tier = tierForPriceId(sub.items.data[0]?.price.id);
          }
        }
        await db.from("contractors").update(update).eq("id", contractorId);
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object;
      const active = sub.status === "active" || sub.status === "trialing";
      await db
        .from("contractors")
        .update({
          stripe_subscription_id: sub.id,
          subscription_tier: active ? tierForPriceId(sub.items.data[0]?.price.id) : null,
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
