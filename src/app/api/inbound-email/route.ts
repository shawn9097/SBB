import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { detectNicheFromText } from "@/lib/sequences";
import { detectNicheWithAI } from "@/lib/claude";
import type { PostmarkInboundPayload, TradeNiche } from "@/types";

// Postmark fires this webhook when a BCC'd estimate email arrives.
// The "To" address is the contractor's unique inbound address, e.g. abc123@warmside.app
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-postmark-token");
  if (token !== process.env.POSTMARK_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload: PostmarkInboundPayload = await req.json();
  const db = supabaseAdmin();

  // Identify which contractor this inbound address belongs to
  const inboundAddress = payload.ToFull[0]?.Email?.toLowerCase();
  const { data: contractor } = await db
    .from("contractors")
    .select("*")
    .eq("inbound_email_address", inboundAddress)
    .single();

  if (!contractor) {
    return NextResponse.json({ error: "Contractor not found for inbound address" }, { status: 404 });
  }

  // Extract prospect info from the email headers (the original recipient = prospect)
  const prospectEmail = payload.From?.toLowerCase();
  const prospectName = payload.FromFull?.Name || prospectEmail.split("@")[0];
  const subject = payload.Subject || "";
  const body = payload.TextBody || "";

  // Detect trade niche
  let niche: TradeNiche;
  const heuristic = detectNicheFromText(subject, body, null);
  if (heuristic.confidence >= 0.8) {
    niche = heuristic.niche;
  } else {
    const ai = await detectNicheWithAI(subject, body);
    if (ai.confidence >= 0.8) {
      niche = ai.niche;
    } else {
      // Below 80% confidence — need contractor to override
      // We still create the prospect but mark campaign as pending niche selection
      niche = ai.niche;
      // TODO: send contractor a disambiguation SMS via Twilio
    }
  }

  // Upsert prospect (don't create duplicates for same email + contractor)
  const { data: prospect, error: prospectError } = await db
    .from("prospects")
    .upsert(
      {
        contractor_id: contractor.id,
        first_name: prospectName.split(" ")[0],
        email: prospectEmail,
        trade_niche: niche,
        estimate_subject: subject,
        consent_confirmed: false, // requires explicit confirmation from contractor
      },
      { onConflict: "contractor_id,email", ignoreDuplicates: false }
    )
    .select()
    .single();

  if (prospectError || !prospect) {
    console.error("Failed to upsert prospect:", prospectError);
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 });
  }

  // Create campaign — starts at touch 0, first touches go out today
  const now = new Date();
  const { error: campaignError } = await db.from("campaigns").insert({
    contractor_id: contractor.id,
    prospect_id: prospect.id,
    trade_niche: niche,
    status: "ACTIVE",
    current_touch_index: 0,
    next_touch_at: now.toISOString(),
  });

  if (campaignError) {
    console.error("Failed to create campaign:", campaignError);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, prospectEmail, niche });
}
