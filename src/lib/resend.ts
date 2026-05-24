import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({
  to,
  from,
  subject,
  text,
}: {
  to: string;
  from: string; // e.g. "Mike Johnson <mike@warmside.app>"
  subject: string;
  text: string;
}) {
  return resend.emails.send({ from, to, subject, text });
}
