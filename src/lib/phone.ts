// Normalize a free-form US phone number to E.164 so it matches what Twilio
// sends in webhooks (e.g. "(615) 555-1234" -> "+16155551234").
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  // Already-international numbers: keep if plausible E.164 length
  if (raw.trim().startsWith("+") && digits.length >= 11 && digits.length <= 15) {
    return `+${digits}`;
  }
  return null;
}
