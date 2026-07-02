-- Warmside: distinguish won jobs from merely-engaged ones
-- Run after 002_auth_and_rls.sql

alter table campaigns
  drop constraint if exists campaigns_status_check;

alter table campaigns
  add constraint campaigns_status_check
  check (status in ('ACTIVE','ENGAGED','QUESTION_NEEDED','PARKED','LOST','DO_NOT_CONTACT','WON'));
