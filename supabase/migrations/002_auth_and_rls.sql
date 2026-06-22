-- Warmside auth + row-level security
-- Run this after 001_initial_schema.sql

-- ─── Link contractors to Supabase Auth users ────────────────────────────────
alter table contractors
  add column user_id uuid unique references auth.users(id) on delete cascade;

-- ─── Row-level security ──────────────────────────────────────────────────────
-- Application writes happen through the service-role admin client, which bypasses
-- RLS. Enabling RLS here closes the anon/authenticated browser client off from data
-- it shouldn't read. Contractors get owner-scoped read/update of their own row so a
-- future dashboard can query directly from the browser.

alter table contractors enable row level security;

create policy "contractors_select_own"
  on contractors for select
  using (auth.uid() = user_id);

create policy "contractors_update_own"
  on contractors for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Prospect/campaign data is only ever touched by the admin client (webhooks + cron).
-- Enabling RLS with no policies denies all access to anon/authenticated clients.
alter table prospects   enable row level security;
alter table campaigns   enable row level security;
alter table touchpoints enable row level security;
alter table closures    enable row level security;
