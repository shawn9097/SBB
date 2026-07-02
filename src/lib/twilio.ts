import twilio from "twilio";
import type { Twilio } from "twilio";

// Whether SMS is turned on. Until A2P 10DLC clears, these env vars are unset and
// the app runs email-only; callers check this before attempting any SMS.
export function isTwilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
  );
}

// Lazily construct the client so merely importing this module never throws when
// Twilio isn't configured (which would take down every route that imports it).
let cachedClient: Twilio | null = null;
function getClient(): Twilio {
  if (!cachedClient) {
    if (!isTwilioConfigured()) throw new Error("Twilio is not configured");
    cachedClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  return cachedClient;
}

// Verify an inbound Twilio webhook actually came from Twilio. Without this, anyone
// can POST a fake "reply" to flip a campaign's status. Set TWILIO_SKIP_VALIDATION=true
// only for local testing where you can't reproduce Twilio's signature.
export function validateTwilioRequest(
  signature: string | null,
  url: string,
  params: Record<string, string>
): boolean {
  if (process.env.TWILIO_SKIP_VALIDATION === "true") return true;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken || !signature) return false;
  return twilio.validateRequest(authToken, signature, url, params);
}

export async function sendSMS(to: string, body: string) {
  return getClient().messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body,
  });
}

// Forward a prospect reply to the contractor's phone
export async function forwardReplyToContractor({
  contractorPhone,
  prospectName,
  prospectPhone,
  estimateSubject,
  estimateAmount,
  replyBody,
}: {
  contractorPhone: string;
  prospectName: string;
  prospectPhone: string;
  estimateSubject: string | null;
  estimateAmount: number | null;
  replyBody: string;
}) {
  const amountLine = estimateAmount
    ? `Estimate: ${estimateSubject ?? "Estimate"}, $${estimateAmount.toLocaleString()}`
    : `Estimate: ${estimateSubject ?? "Estimate"}`;

  const body = `📬 Warmside reply\nFrom: ${prospectName} (${prospectPhone})\n${amountLine}\n\n"${replyBody.trim()}"\n\nTap to call · Tap to reply`;

  return sendSMS(contractorPhone, body);
}
