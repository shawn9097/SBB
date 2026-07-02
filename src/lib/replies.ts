import type { SupabaseClient } from "@supabase/supabase-js";
import { classifyReplyIntent, type ReplyIntent } from "@/lib/claude";
import { forwardReplyToContractor, sendSMS, isTwilioConfigured } from "@/lib/twilio";
import { forwardReplyEmailToContractor, sendEmail, emailFromDomain } from "@/lib/resend";
import type { CampaignStatus, TouchChannel } from "@/types";

const STATUS_MAP: Record<ReplyIntent, CampaignStatus> = {
  interested: "ENGAGED",
  question: "QUESTION_NEEDED",
  not_now: "PARKED",
  polite_no: "LOST",
  stop: "DO_NOT_CONTACT",
};

interface MinimalContractor {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
}

interface MinimalProspect {
  first_name: string;
  phone: string | null;
  email: string | null;
  estimate_subject: string | null;
  estimate_amount: number | null;
}

// Shared handling for an inbound reply from a prospect, regardless of whether it
// arrived by SMS or email: classify intent, stop/redirect the sequence, log the
// reply, and forward it to the contractor. Forwarding always goes out by email
// (works today); SMS forwarding to the contractor's phone is attempted best-effort
// and comes fully online once A2P 10DLC registration clears.
export async function handleProspectReply({
  db,
  contractor,
  prospect,
  campaignId,
  replyBody,
  channel,
}: {
  db: SupabaseClient;
  contractor: MinimalContractor;
  prospect: MinimalProspect;
  campaignId: string;
  replyBody: string;
  channel: TouchChannel;
}): Promise<{ intent: ReplyIntent; status: CampaignStatus }> {
  const intent = await classifyReplyIntent(replyBody);
  const status = STATUS_MAP[intent];

  const updatePayload: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (intent === "not_now") {
    const parkedUntil = new Date();
    parkedUntil.setDate(parkedUntil.getDate() + 30);
    updatePayload.parked_until = parkedUntil.toISOString();
  }

  await db.from("campaigns").update(updatePayload).eq("id", campaignId);

  await db.from("touchpoints").insert({
    campaign_id: campaignId,
    touch_index: -1, // -1 = inbound from prospect
    channel,
    body: replyBody,
    sent_at: new Date().toISOString(),
    replied_at: new Date().toISOString(),
  });

  const prospectContact =
    channel === "sms" ? prospect.phone ?? prospect.email ?? "unknown" : prospect.email ?? prospect.phone ?? "unknown";

  // Primary forward: email to the contractor (works today).
  try {
    await forwardReplyEmailToContractor({
      contractorEmail: contractor.email,
      prospectName: prospect.first_name,
      prospectContact,
      estimateSubject: prospect.estimate_subject,
      estimateAmount: prospect.estimate_amount,
      replyBody,
    });
  } catch (e) {
    console.error("Email forward to contractor failed:", e);
  }

  // Secondary forward: SMS to the contractor's phone (best-effort; live post-A2P).
  if (isTwilioConfigured() && contractor.phone && channel === "sms" && prospect.phone) {
    try {
      await forwardReplyToContractor({
        contractorPhone: contractor.phone,
        prospectName: prospect.first_name,
        prospectPhone: prospect.phone,
        estimateSubject: prospect.estimate_subject,
        estimateAmount: prospect.estimate_amount,
        replyBody,
      });
    } catch (e) {
      console.error("SMS forward to contractor failed:", e);
    }
  }

  // Channel-matched auto-reply for soft closes, best-effort.
  const autoReply =
    intent === "not_now"
      ? `No problem — ${contractor.first_name} will come back then.`
      : intent === "polite_no"
      ? `Appreciate you letting me know. Take care. — ${contractor.first_name}`
      : null;

  if (autoReply) {
    try {
      if (channel === "sms" && prospect.phone && isTwilioConfigured()) {
        await sendSMS(prospect.phone, autoReply);
      } else if (channel === "email" && prospect.email) {
        await sendEmail({
          to: prospect.email,
          from: `${contractor.first_name} ${contractor.last_name} <noreply@${emailFromDomain()}>`,
          subject: "Thanks for the note",
          text: autoReply,
        });
      }
    } catch (e) {
      console.error("Auto-reply failed:", e);
    }
  }

  return { intent, status };
}
