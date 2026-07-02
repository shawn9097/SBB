import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase";
import { detectNicheFromText } from "@/lib/sequences";
import { detectNicheWithAI, extractProspectInfo } from "@/lib/claude";
import { normalizePhone } from "@/lib/phone";
import { handleProspectReply } from "@/lib/replies";
import type { ExtractedProspectInfo } from "@/lib/claude";
import type { Contractor, PostmarkInboundPayload, TradeNiche } from "@/types";

// A message to the inbound address from someone who isn't the contractor is a
// prospect answering a follow-up email. Find their live campaign and stop it.
async function handleInboundReply(
  db: SupabaseClient,
  contractor: Contractor,
  senderEmail: string,
  replyBody: string
): Promise<NextResponse> {
  const { data: prospect } = await db
    .from("prospects")
    .select("*, campaigns(*)")
    .eq("contractor_id", contractor.id)
    .eq("email", senderEmail)
    .maybeSingle();

  if (!prospect) {
    return NextResponse.json(
      { error: "Sender is neither the contractor nor a known prospect" },
      { status: 403 }
    );
  }

  const campaign = (prospect.campaigns ?? []).find(
    (c: { status: string }) => c.status === "ACTIVE" || c.status === "QUESTION_NEEDED"
  );
  if (!campaign) {
    return NextResponse.json({ ok: true, note: "No live campaign to update" });
  }

  const { intent } = await handleProspectReply({
    db,
    contractor,
    prospect,
    campaignId: campaign.id,
    replyBody,
    channel: "email",
  });

  return NextResponse.json({ ok: true, reply: true, intent });
}

// Postmark fires this webhook when a contractor BCCs their unique Warmside
// address on an estimate email. Party roles in that message:
//   From              = the contractor (they sent the estimate)
//   To                = the prospect (the homeowner receiving the estimate)
//   envelope recipient = the Warmside inbound address (BCC'd, so usually
//                        absent from the headers — Postmark surfaces it as
//                        OriginalRecipient)
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-postmark-token");
  if (token !== process.env.POSTMARK_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload: PostmarkInboundPayload = await req.json();
  const db = supabaseAdmin();

  // Candidate inbound addresses: envelope recipient first (the BCC case),
  // then any header recipients (covers To/Cc'd inbound addresses too).
  const headerRecipients = [
    ...(payload.ToFull ?? []),
    ...(payload.CcFull ?? []),
    ...(payload.BccFull ?? []),
  ]
    .map((r) => ({ email: r.Email?.toLowerCase() ?? "", name: r.Name ?? "" }))
    .filter((r) => r.email);

  const candidateAddresses = [
    payload.OriginalRecipient?.toLowerCase(),
    ...headerRecipients.map((r) => r.email),
  ].filter((e): e is string => Boolean(e));

  if (!candidateAddresses.length) {
    return NextResponse.json({ error: "No recipients in payload" }, { status: 422 });
  }

  const { data: contractor } = await db
    .from("contractors")
    .select("*")
    .in("inbound_email_address", candidateAddresses)
    .maybeSingle();

  if (!contractor) {
    return NextResponse.json(
      { error: "Contractor not found for inbound address" },
      { status: 404 }
    );
  }

  const senderEmail = (payload.FromFull?.Email || payload.From || "").toLowerCase().trim();

  // The inbound address does double duty: the contractor BCCs it to start a
  // campaign, and prospects reach it via Reply-To when they answer a follow-up.
  // A message from anyone other than the contractor is treated as a prospect
  // reply — and if it isn't from a known prospect either, it's rejected so a
  // stranger who learns the address can't trigger anything.
  if (senderEmail !== contractor.email.toLowerCase()) {
    return handleInboundReply(
      db,
      contractor,
      senderEmail,
      payload.TextBody || payload.Subject || ""
    );
  }

  // The prospect is the recipient who isn't us and isn't the contractor.
  const inboundAddress = contractor.inbound_email_address.toLowerCase();
  const prospectRecipient = headerRecipients.find(
    (r) => r.email !== inboundAddress && r.email !== senderEmail
  );

  if (!prospectRecipient) {
    return NextResponse.json(
      { error: "No prospect recipient found — estimate must be addressed to the homeowner" },
      { status: 422 }
    );
  }

  const prospectEmail = prospectRecipient.email;
  const subject = payload.Subject || "";
  const body = payload.TextBody || "";

  // Pull the prospect's phone / name / amount / scope out of the estimate body.
  // Best-effort: a failed extraction still creates an email-only campaign.
  let extracted: ExtractedProspectInfo = {
    first_name: null,
    phone: null,
    estimate_amount: null,
    scope_summary: null,
  };
  try {
    extracted = await extractProspectInfo(subject, body);
  } catch (e) {
    console.error("Prospect info extraction failed:", e);
  }

  const prospectFirstName =
    prospectRecipient.name.split(" ")[0] ||
    extracted.first_name ||
    prospectEmail.split("@")[0];
  const prospectPhone = normalizePhone(extracted.phone);

  // Detect trade niche
  let niche: TradeNiche;
  const heuristic = detectNicheFromText(subject, body, extracted.estimate_amount);
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

  // Upsert prospect (don't create duplicates for same email + contractor).
  // Extracted fields are only included when present so a re-sent estimate
  // never clobbers data we already have with nulls.
  const { data: prospect, error: prospectError } = await db
    .from("prospects")
    .upsert(
      {
        contractor_id: contractor.id,
        first_name: prospectFirstName,
        email: prospectEmail,
        trade_niche: niche,
        estimate_subject: subject,
        ...(prospectPhone ? { phone: prospectPhone } : {}),
        ...(extracted.estimate_amount != null
          ? { estimate_amount: extracted.estimate_amount }
          : {}),
        ...(extracted.scope_summary ? { scope_summary: extracted.scope_summary } : {}),
      },
      { onConflict: "contractor_id,email", ignoreDuplicates: false }
    )
    .select()
    .single();

  if (prospectError || !prospect) {
    console.error("Failed to upsert prospect:", prospectError);
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 });
  }

  // Idempotency: Postmark retries and re-sent estimates must not spawn a
  // second live campaign for the same prospect.
  const { data: liveCampaign } = await db
    .from("campaigns")
    .select("id")
    .eq("prospect_id", prospect.id)
    .in("status", ["ACTIVE", "ENGAGED", "QUESTION_NEEDED"])
    .limit(1)
    .maybeSingle();

  if (liveCampaign) {
    return NextResponse.json({ ok: true, deduped: true, prospectEmail, niche });
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

  return NextResponse.json({
    ok: true,
    prospectEmail,
    niche,
    phoneCaptured: Boolean(prospectPhone),
  });
}
