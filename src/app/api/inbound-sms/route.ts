import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { validateTwilioRequest } from "@/lib/twilio";
import { handleProspectReply } from "@/lib/replies";

function twiml(): NextResponse {
  return new NextResponse("<Response/>", {
    headers: { "Content-Type": "text/xml" },
  });
}

// Twilio fires this webhook when a prospect replies to a sequence SMS.
// Twilio sends form-encoded data; the "From" field is the prospect's phone.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const params: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    params[key] = String(value);
  }

  // Reconstruct the public URL Twilio signed against (honouring the proxy).
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  const url = `${proto}://${host}${req.nextUrl.pathname}`;

  if (!validateTwilioRequest(req.headers.get("x-twilio-signature"), url, params)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const prospectPhone = params.From || "";
  const replyBody = params.Body || "";
  if (!prospectPhone || !replyBody) return twiml();

  const db = supabaseAdmin();

  const { data: prospect } = await db
    .from("prospects")
    .select("*, campaigns(*), contractors(*)")
    .eq("phone", prospectPhone)
    .maybeSingle();

  if (!prospect || !prospect.campaigns?.length) return twiml();

  const campaign = prospect.campaigns.find(
    (c: { status: string }) => c.status === "ACTIVE" || c.status === "QUESTION_NEEDED"
  );
  if (!campaign) return twiml();

  await handleProspectReply({
    db,
    contractor: prospect.contractors,
    prospect,
    campaignId: campaign.id,
    replyBody,
    channel: "sms",
  });

  return twiml();
}
