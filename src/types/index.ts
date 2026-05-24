export type TradeNiche =
  | "roofing"
  | "hvac"
  | "painting"
  | "kitchen_bath"
  | "landscaping"
  | "fencing";

export type CampaignStatus =
  | "ACTIVE"
  | "ENGAGED"
  | "QUESTION_NEEDED"
  | "PARKED"
  | "LOST"
  | "DO_NOT_CONTACT";

export type TouchChannel = "sms" | "email";

export interface Contractor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  phone: string;
  inbound_email_address: string; // unique BCC address, e.g. abc123@warmside.app
  trade_niche: TradeNiche;
  voice_dna: VoiceDNA | null;
  trade_value_1: string | null;
  lead_time_weeks: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_tier: "standard" | "volume" | null;
  created_at: string;
}

export interface VoiceDNA {
  greeting_style: string;   // e.g. "Hey {{name}}," or "Hi {{name}} —"
  signoff_style: string;    // e.g. "Talk soon," or "Take care,"
  punctuation_notes: string;
  pet_phrases: string[];
  question_framing: "direct" | "soft";
  never_say: string[];
}

export interface Prospect {
  id: string;
  contractor_id: string;
  first_name: string;
  email: string;
  phone: string | null;
  estimate_amount: number | null;
  estimate_subject: string | null;
  trade_niche: TradeNiche;
  scope_summary: string | null;
  consent_confirmed: boolean;
  consent_confirmed_at: string | null;
  created_at: string;
}

export interface Campaign {
  id: string;
  contractor_id: string;
  prospect_id: string;
  trade_niche: TradeNiche;
  status: CampaignStatus;
  current_touch_index: number; // 0-based index into the sequence
  next_touch_at: string | null;
  parked_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface Touchpoint {
  id: string;
  campaign_id: string;
  touch_index: number;
  channel: TouchChannel;
  subject: string | null;
  body: string;
  sent_at: string;
  opened_at: string | null;
  replied_at: string | null;
}

export interface Closure {
  id: string;
  campaign_id: string;
  contractor_id: string;
  prospect_id: string;
  job_value: number | null;
  closed_at: string;
  touchstone_receipt: TouchstoneReceipt;
}

export interface TouchstoneReceipt {
  touches_sent: number;
  first_touch_at: string;
  reply_at: string | null;
  closed_at: string;
  summary: string;
}

// Inbound Postmark webhook payload (partial)
export interface PostmarkInboundPayload {
  From: string;
  FromFull: { Email: string; Name: string };
  To: string;
  ToFull: Array<{ Email: string; Name: string }>;
  Cc: string;
  CcFull: Array<{ Email: string; Name: string }>;
  Subject: string;
  TextBody: string;
  HtmlBody: string;
  MessageID: string;
  Date: string;
}
