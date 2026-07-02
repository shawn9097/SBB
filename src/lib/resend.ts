import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// The domain we send email FROM (verified in Resend, e.g. warmside.app). This is
// deliberately separate from INBOUND_EMAIL_DOMAIN — inbound/BCC addresses live on a
// subdomain whose MX points at Postmark, so the root stays free for a normal inbox.
// Falls back to INBOUND_EMAIL_DOMAIN when they're the same domain.
export function emailFromDomain(): string {
  return process.env.EMAIL_FROM_DOMAIN || process.env.INBOUND_EMAIL_DOMAIN || "";
}

export async function sendEmail({
  to,
  from,
  subject,
  text,
  replyTo,
}: {
  to: string;
  from: string; // e.g. "Mike Johnson <mike@warmside.app>"
  subject: string;
  text: string;
  replyTo?: string; // where prospect replies should land (their contractor's inbound address)
}) {
  return resend.emails.send({ from, to, subject, text, replyTo });
}

// Forward a prospect's reply to the contractor by email. This is the delivery path
// that works today; SMS forwarding to the contractor's phone comes online once A2P
// 10DLC registration clears.
export async function forwardReplyEmailToContractor({
  contractorEmail,
  prospectName,
  prospectContact,
  estimateSubject,
  estimateAmount,
  replyBody,
}: {
  contractorEmail: string;
  prospectName: string;
  prospectContact: string;
  estimateSubject: string | null;
  estimateAmount: number | null;
  replyBody: string;
}) {
  const amountLine = estimateAmount
    ? `${estimateSubject ?? "Estimate"} · $${estimateAmount.toLocaleString()}`
    : estimateSubject ?? "Estimate";

  const from = `Warmside <noreply@${emailFromDomain()}>`;
  const text = `${prospectName} replied to your follow-up.

${amountLine}
Reach them at: ${prospectContact}

They said:
"${replyBody.trim()}"

— Warmside has paused the sequence. Take it from here.`;

  return resend.emails.send({
    from,
    to: contractorEmail,
    subject: `${prospectName} replied — ${amountLine}`,
    text,
    replyTo: prospectContact.includes("@") ? prospectContact : undefined,
  });
}
