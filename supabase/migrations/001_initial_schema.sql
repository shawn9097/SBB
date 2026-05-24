-- Warmside initial schema
-- Run this in your Supabase SQL editor or via the Supabase CLI

create extension if not exists "uuid-ossp";

-- ─── Contractors ─────────────────────────────────────────────────────────────
create table contractors (
  id                     uuid primary key default uuid_generate_v4(),
  email                  text unique not null,
  first_name             text not null,
  last_name              text not null,
  company_name           text not null,
  phone                  text not null,
  inbound_email_address  text unique not null, -- e.g. abc123@warmside.app
  trade_niche            text not null default 'roofing',
  voice_dna              jsonb,                -- VoiceDNA profile (built at onboarding)
  trade_value_1          text,                 -- contractor's primary differentiator
  lead_time_weeks        text,
  stripe_customer_id     text,
  stripe_subscription_id text,
  subscription_tier      text check (subscription_tier in ('standard', 'volume')),
  created_at             timestamptz not null default now()
);

-- ─── Prospects ───────────────────────────────────────────────────────────────
create table prospects (
  id                   uuid primary key default uuid_generate_v4(),
  contractor_id        uuid not null references contractors(id) on delete cascade,
  first_name           text not null,
  email                text not null,
  phone                text,
  estimate_amount      numeric,
  estimate_subject     text,
  scope_summary        text,
  trade_niche          text not null,
  consent_confirmed    boolean not null default false,
  consent_confirmed_at timestamptz,
  created_at           timestamptz not null default now(),
  unique (contractor_id, email)
);

-- ─── Campaigns ───────────────────────────────────────────────────────────────
create table campaigns (
  id                  uuid primary key default uuid_generate_v4(),
  contractor_id       uuid not null references contractors(id) on delete cascade,
  prospect_id         uuid not null references prospects(id) on delete cascade,
  trade_niche         text not null,
  status              text not null default 'ACTIVE'
                        check (status in ('ACTIVE','ENGAGED','QUESTION_NEEDED','PARKED','LOST','DO_NOT_CONTACT')),
  current_touch_index integer not null default 0,
  next_touch_at       timestamptz,
  parked_until        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index idx_campaigns_status_next_touch on campaigns(status, next_touch_at);

-- ─── Touchpoints ─────────────────────────────────────────────────────────────
create table touchpoints (
  id          uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  touch_index integer not null,  -- -1 = inbound reply from prospect
  channel     text not null check (channel in ('sms', 'email')),
  subject     text,
  body        text not null,
  sent_at     timestamptz not null default now(),
  opened_at   timestamptz,
  replied_at  timestamptz
);

-- ─── Closures (Touchstone Receipts) ─────────────────────────────────────────
create table closures (
  id                 uuid primary key default uuid_generate_v4(),
  campaign_id        uuid not null references campaigns(id) on delete cascade,
  contractor_id      uuid not null references contractors(id) on delete cascade,
  prospect_id        uuid not null references prospects(id) on delete cascade,
  job_value          numeric,
  closed_at          timestamptz not null default now(),
  touchstone_receipt jsonb not null
);
