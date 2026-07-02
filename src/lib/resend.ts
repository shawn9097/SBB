import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

  const from = `Warmside <noreply@${process.env.INBOUND_EMAIL_DOMAIN}>`;
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
