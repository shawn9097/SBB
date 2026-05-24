import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const FROM = process.env.TWILIO_PHONE_NUMBER!;

export async function sendSMS(to: string, body: string) {
  return client.messages.create({ from: FROM, to, body });
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
