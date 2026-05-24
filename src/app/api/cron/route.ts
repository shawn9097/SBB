import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { SEQUENCES, applyVariables } from "@/lib/sequences";
import { applyVoiceTwin } from "@/lib/claude";
import { sendSMS } from "@/lib/twilio";
import { sendEmail } from "@/lib/resend";
import type { Campaign, Contractor, Prospect, TradeNiche } from "@/types";

// This endpoint is called by Vercel Cron (configured in vercel.json) once per day.
// It finds all ACTIVE campaigns with next_touch_at <= now, sends the next touch,
// and schedules the following one.
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = supabaseAdmin();
  const now = new Date().toISOString();

  const { data: dueCampaigns, error } = await db
    .from("campaigns")
    .select("*, prospects(*), contractors(*)")
    .eq("status", "ACTIVE")
    .lte("next_touch_at", now);

  if (error) {
    console.error("Cron fetch error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  let sent = 0;
  let completed = 0;

  for (const campaign of dueCampaigns ?? []) {
    const contractor: Contractor = campaign.contractors;
    const prospect: Prospect = campaign.prospects;
    const niche: TradeNiche = campaign.trade_niche;
    const sequence = SEQUENCES[niche];

    if (!sequence) continue;

    const touch = sequence.touches[campaign.current_touch_index];
    if (!touch) {
      // Sequence finished
      await db
        .from("campaigns")
        .update({ status: "LOST", updated_at: new Date().toISOString() })
        .eq("id", campaign.id);
      completed++;
      continue;
    }

    // Build variable map from contractor + prospect data
    const vars: Record<string, string | number | null | undefined> = {
      first_name: prospect.first_name,
      contractor_first: contractor.first_name,
      contractor_full: `${contractor.first_name} ${contractor.last_name}`,
      company: contractor.company_name,
      contractor_phone: contractor.phone,
      trade_value_1: contractor.trade_value_1 ?? null,
      lead_time_weeks: contractor.lead_time_weeks ?? "2–4",
      scope_summary: prospect.scope_summary ?? "the work we discussed",
      estimate_amount: prospect.estimate_amount ?? null,
    };

    // Apply variables then optionally apply Voice Twin
    let body = applyVariables(touch.body, vars);
    let subject = touch.subject ? applyVariables(touch.subject, vars) : undefined;

    if (contractor.voice_dna) {
      try {
        body = await applyVoiceTwin(body, contractor.voice_dna);
      } catch (e) {
        console.error("Voice Twin failed, using template:", e);
      }
    }

    // Send the touch
    try {
      if (touch.channel === "sms" && prospect.phone) {
        await sendSMS(prospect.phone, body);
      } else if (touch.channel === "email" && prospect.email) {
        await sendEmail({
          to: prospect.email,
          from: `${contractor.first_name} ${contractor.last_name} <noreply@${process.env.INBOUND_EMAIL_DOMAIN}>`,
          subject: subject ?? "Following up",
          text: body,
        });
      }

      // Log the touchpoint
      await db.from("touchpoints").insert({
        campaign_id: campaign.id,
        touch_index: touch.index,
        channel: touch.channel,
        subject: subject ?? null,
        body,
        sent_at: new Date().toISOString(),
      });

      sent++;
    } catch (e) {
      console.error(`Failed to send touch for campaign ${campaign.id}:`, e);
      continue;
    }

    // Advance or complete the campaign
    const nextTouchIndex = campaign.current_touch_index + 1;
    const nextTouch = sequence.touches[nextTouchIndex];

    if (nextTouch) {
      const nextAt = new Date();
      nextAt.setDate(nextAt.getDate() + (nextTouch.dayOffset - touch.dayOffset));
      await db
        .from("campaigns")
        .update({
          current_touch_index: nextTouchIndex,
          next_touch_at: nextAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", campaign.id);
    } else {
      await db
        .from("campaigns")
        .update({ status: "LOST", updated_at: new Date().toISOString() })
        .eq("id", campaign.id);
      completed++;
    }
  }

  return NextResponse.json({ ok: true, sent, completed });
}
