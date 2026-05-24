import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Called when a contractor marks a prospect as closed (won).
// Creates a Touchstone Receipt — the ROI proof document.
export async function POST(req: NextRequest) {
  const { campaignId, jobValue } = await req.json() as {
    campaignId: string;
    jobValue?: number;
  };

  if (!campaignId) {
    return NextResponse.json({ error: "campaignId is required" }, { status: 400 });
  }

  const db = supabaseAdmin();

  const { data: campaign } = await db
    .from("campaigns")
    .select("*, prospects(*), touchpoints(*)")
    .eq("id", campaignId)
    .single();

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const touches = (campaign.touchpoints ?? []).filter(
    (t: { touch_index: number }) => t.touch_index >= 0
  );
  const firstTouch = touches[0];
  const reply = (campaign.touchpoints ?? []).find(
    (t: { touch_index: number }) => t.touch_index === -1
  );

  const now = new Date().toISOString();

  const touchstoneReceipt = {
    touches_sent: touches.length,
    first_touch_at: firstTouch?.sent_at ?? now,
    reply_at: reply?.replied_at ?? null,
    closed_at: now,
    summary: `${touches.length} touchpoints sent over ${
      firstTouch
        ? Math.ceil(
            (Date.now() - new Date(firstTouch.sent_at).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0
    } days. Prospect engaged${reply ? " and replied" : ""}. Job closed.`,
  };

  await db.from("closures").insert({
    campaign_id: campaign.id,
    contractor_id: campaign.contractor_id,
    prospect_id: campaign.prospect_id,
    job_value: jobValue ?? null,
    closed_at: now,
    touchstone_receipt: touchstoneReceipt,
  });

  await db
    .from("campaigns")
    .update({ status: "ENGAGED", updated_at: now })
    .eq("id", campaign.id);

  return NextResponse.json({ ok: true, touchstoneReceipt });
}
