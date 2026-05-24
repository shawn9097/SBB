import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { classifyReplyIntent } from "@/lib/claude";
import { forwardReplyToContractor } from "@/lib/twilio";
import { sendSMS } from "@/lib/twilio";
import type { CampaignStatus } from "@/types";

// Twilio fires this webhook when a prospect replies to a sequence SMS.
// Twilio sends form-encoded data; the "From" field is the prospect's phone.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const prospectPhone = (formData.get("From") as string) || "";
  const replyBody = (formData.get("Body") as string) || "";

  if (!prospectPhone || !replyBody) {
    return new NextResponse("<Response/>", {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const db = supabaseAdmin();

  // Find the active campaign for this prospect phone
  const { data: prospect } = await db
    .from("prospects")
    .select("*, campaigns(*), contractors(*)")
    .eq("phone", prospectPhone)
    .single();

  if (!prospect || !prospect.campaigns?.length) {
    return new NextResponse("<Response/>", {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const campaign = prospect.campaigns.find(
    (c: { status: string }) => c.status === "ACTIVE" || c.status === "QUESTION_NEEDED"
  );
  if (!campaign) {
    return new NextResponse("<Response/>", {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const contractor = prospect.contractors;
  const intent = await classifyReplyIntent(replyBody);

  const STATUS_MAP: Record<typeof intent, CampaignStatus> = {
    interested: "ENGAGED",
    question: "QUESTION_NEEDED",
    not_now: "PARKED",
    polite_no: "LOST",
    stop: "DO_NOT_CONTACT",
  };

  const newStatus = STATUS_MAP[intent];

  // Update campaign status
  const updatePayload: Record<string, unknown> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  // For "not now" replies, try to parse a time hint (rough — contractor can adjust)
  if (intent === "not_now") {
    const parkedUntil = new Date();
    parkedUntil.setDate(parkedUntil.getDate() + 30); // default 30 days
    updatePayload.parked_until = parkedUntil.toISOString();
  }

  await db.from("campaigns").update(updatePayload).eq("id", campaign.id);

  // Log the reply as a touchpoint
  await db.from("touchpoints").insert({
    campaign_id: campaign.id,
    touch_index: -1, // -1 = inbound from prospect
    channel: "sms",
    body: replyBody,
    sent_at: new Date().toISOString(),
    replied_at: new Date().toISOString(),
  });

  // Forward the reply to the contractor's phone
  if (contractor?.phone) {
    await forwardReplyToContractor({
      contractorPhone: contractor.phone,
      prospectName: prospect.first_name,
      prospectPhone,
      estimateSubject: prospect.estimate_subject,
      estimateAmount: prospect.estimate_amount,
      replyBody,
    });
  }

  // Send auto-reply for certain intents
  if (intent === "not_now" && contractor) {
    await sendSMS(
      prospectPhone,
      `No problem — ${contractor.first_name} will come back then.`
    );
  } else if (intent === "polite_no" && contractor) {
    await sendSMS(
      prospectPhone,
      `Appreciate you letting me know. Take care. — ${contractor.first_name}`
    );
  }
  // stop / DO_NOT_CONTACT: Twilio handles STOP suppression automatically

  return new NextResponse("<Response/>", {
    headers: { "Content-Type": "text/xml" },
  });
}
