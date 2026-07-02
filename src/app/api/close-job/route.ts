import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Called when a contractor marks a prospect as closed (won).
// Creates a Touchstone Receipt — the ROI proof document.
export async function POST(req: NextRequest) {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { campaignId, jobValue } = (await req.json()) as {
    campaignId?: string;
    jobValue?: number;
  };

  if (!campaignId) {
    return NextResponse.json({ error: "campaignId is required" }, { status: 400 });
  }

  const db = supabaseAdmin();

  const { data: campaign } = await db
    .from("campaigns")
    .select("*, contractors(user_id), prospects(*), touchpoints(*)")
    .eq("id", campaignId)
    .maybeSingle();

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  // Only the campaign's own contractor may close it.
  if (campaign.contractors?.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // A campaign can only be closed once.
  const { data: existingClosure } = await db
    .from("closures")
    .select("id")
    .eq("campaign_id", campaign.id)
    .maybeSingle();
  if (existingClosure) {
    return NextResponse.json({ error: "Job already closed" }, { status: 409 });
  }

  const touches = (campaign.touchpoints ?? []).filter(
    (t: { touch_index: number }) => t.touch_index >= 0
  );
  const firstTouch = touches[0];
  const reply = (campaign.touchpoints ?? []).find(
    (t: { touch_index: number }) => t.touch_index === -1
  );

  const now = new Date().toISOString();

  const daysElapsed = firstTouch
    ? Math.ceil(
        (Date.now() - new Date(firstTouch.sent_at).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const touchstoneReceipt = {
    touches_sent: touches.length,
    first_touch_at: firstTouch?.sent_at ?? now,
    reply_at: reply?.replied_at ?? null,
    closed_at: now,
    summary: `${touches.length} touchpoints over ${daysElapsed} days. Prospect engaged${
      reply ? " and replied" : ""
    }. Job closed.`,
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
    .update({ status: "WON", updated_at: now })
    .eq("id", campaign.id);

  return NextResponse.json({ ok: true, touchstoneReceipt });
}
