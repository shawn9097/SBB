import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import SignOutButton from "@/components/SignOutButton";
import PlanPicker from "@/components/PlanPicker";
import CloseJobButton from "@/components/CloseJobButton";

export const dynamic = "force-dynamic";

const STATUS_META: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Following up", className: "bg-[#DCE7D5] text-[#3F5B34]" },
  ENGAGED: { label: "Replied", className: "bg-[#F4E3C1] text-[#8A6414]" },
  QUESTION_NEEDED: { label: "Question", className: "bg-[#F4E3C1] text-[#8A6414]" },
  PARKED: { label: "Parked", className: "bg-[#E4E7EA] text-[#4A545E]" },
  LOST: { label: "Closed out", className: "bg-[#E4E7EA] text-[#6B7178]" },
  DO_NOT_CONTACT: { label: "Opted out", className: "bg-[#E4E7EA] text-[#6B7178]" },
  WON: { label: "Won", className: "bg-[#DCE7D5] text-[#3F5B34]" },
};

function money(value: number | string | null | undefined): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (n == null || Number.isNaN(n)) return "—";
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

interface CampaignRow {
  id: string;
  status: string;
  updated_at: string;
  prospects: {
    first_name: string | null;
    email: string | null;
    estimate_amount: number | string | null;
    estimate_subject: string | null;
  } | null;
}

interface ClosureRow {
  id: string;
  job_value: number | string | null;
  closed_at: string;
  touchstone_receipt: { summary?: string } | null;
  prospects: { first_name: string | null } | null;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;

  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) redirect("/login");

  const db = supabaseAdmin();
  const { data: contractor } = await db
    .from("contractors")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // Signed up but never onboarded — send them to finish setup.
  if (!contractor) redirect("/onboarding");

  const [{ data: campaigns }, { data: closures }] = await Promise.all([
    db
      .from("campaigns")
      .select(
        "id, status, updated_at, prospects(first_name, email, estimate_amount, estimate_subject)"
      )
      .eq("contractor_id", contractor.id)
      .order("updated_at", { ascending: false })
      .limit(50),
    db
      .from("closures")
      .select("id, job_value, closed_at, touchstone_receipt, prospects(first_name)")
      .eq("contractor_id", contractor.id)
      .order("closed_at", { ascending: false }),
  ]);

  const campaignRows = (campaigns ?? []) as unknown as CampaignRow[];
  const closureRows = (closures ?? []) as unknown as ClosureRow[];

  const activeCount = campaignRows.filter((c) => c.status === "ACTIVE").length;
  const repliedCount = campaignRows.filter(
    (c) => c.status === "ENGAGED" || c.status === "QUESTION_NEEDED"
  ).length;
  const jobsClosed = closureRows.length;
  const revenueRecovered = closureRows.reduce(
    (sum, c) => sum + (Number(c.job_value) || 0),
    0
  );

  const subscribed = Boolean(contractor.subscription_tier);

  return (
    <main className="min-h-screen bg-[#EFE6D0] text-[#0F1417] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-start mb-8">
          <div>
            <span className="font-serif text-xl font-bold tracking-tight">
              Warmside<span className="text-[#C8923A]">.</span>
            </span>
            <p className="text-sm text-[#6B7178] mt-1">
              {contractor.company_name}
            </p>
          </div>
          <SignOutButton />
        </header>

        {checkout === "success" && (
          <p className="text-sm text-[#3F5B34] bg-[#DCE7D5] border border-[#C3D4B8] rounded px-4 py-3 mb-6">
            You&apos;re all set — your plan is active. Follow-ups will start going out
            on your next estimate.
          </p>
        )}
        {checkout === "cancelled" && (
          <p className="text-sm text-[#8A6414] bg-[#F4E3C1] border border-[#E5CF9E] rounded px-4 py-3 mb-6">
            Checkout cancelled — no charge was made. You can activate a plan anytime
            below.
          </p>
        )}

        {/* BCC address */}
        <section className="bg-[#F4ECD9] border border-[#E0D3B2] rounded-lg p-5 mb-8">
          <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-2">
            Your BCC address
          </p>
          <p className="font-mono text-base text-[#28394B] break-all">
            {contractor.inbound_email_address}
          </p>
          <p className="text-xs text-[#6B7178] mt-2">
            BCC this on every estimate to start a follow-up sequence.
          </p>
        </section>

        {!subscribed && (
          <section className="border border-[#E0D3B2] rounded-lg p-6 mb-8 bg-[#FBF6EA]">
            <h2 className="font-serif text-2xl font-semibold mb-2 tracking-tight">
              Activate your plan to turn follow-ups on
            </h2>
            <p className="text-sm text-[#3A4148] mb-6">
              Your account is set up, but sequences stay paused until you&apos;re on a
              plan. Cancel anytime · 30-day guarantee.
            </p>
            <PlanPicker />
          </section>
        )}

        {/* ROI metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active follow-ups", value: String(activeCount) },
            { label: "Replies", value: String(repliedCount) },
            { label: "Jobs closed", value: String(jobsClosed) },
            { label: "Revenue recovered", value: money(revenueRecovered) },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-[#F4ECD9] border border-[#E0D3B2] rounded-lg p-5"
            >
              <div className="font-serif text-3xl font-semibold">{m.value}</div>
              <div className="font-mono text-xs tracking-wide uppercase text-[#6B7178] mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </section>

        {/* Touchstone Receipts */}
        {closureRows.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold mb-4">
              Touchstone Receipts
            </h2>
            <div className="space-y-3">
              {closureRows.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#F4ECD9] border border-[#E0D3B2] rounded-lg p-4 flex justify-between items-start gap-4"
                >
                  <div>
                    <div className="font-medium">
                      {c.prospects?.first_name || "Prospect"}
                    </div>
                    <div className="text-sm text-[#3A4148] mt-1">
                      {c.touchstone_receipt?.summary || "Job closed."}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-serif text-lg font-semibold text-[#3F5B34]">
                      {money(c.job_value)}
                    </div>
                    <div className="font-mono text-xs text-[#6B7178]">
                      {new Date(c.closed_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Campaigns */}
        <section>
          <h2 className="font-serif text-xl font-semibold mb-4">Follow-ups</h2>
          {campaignRows.length === 0 ? (
            <div className="bg-[#F4ECD9] border border-[#E0D3B2] rounded-lg p-8 text-center text-[#6B7178]">
              No follow-ups yet. BCC your Warmside address on your next estimate and
              it&apos;ll show up here.
            </div>
          ) : (
            <div className="space-y-2">
              {campaignRows.map((c) => {
                const meta = STATUS_META[c.status] ?? {
                  label: c.status,
                  className: "bg-[#E4E7EA] text-[#4A545E]",
                };
                return (
                  <div
                    key={c.id}
                    className="bg-[#F4ECD9] border border-[#E0D3B2] rounded-lg px-4 py-3 flex justify-between items-center gap-4"
                  >
                    <div className="min-w-0">
                      <div className="font-medium truncate">
                        {c.prospects?.first_name || c.prospects?.email || "Prospect"}
                      </div>
                      <div className="text-sm text-[#6B7178] truncate">
                        {c.prospects?.estimate_subject || "Estimate"}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm text-[#3A4148]">
                        {money(c.prospects?.estimate_amount)}
                      </span>
                      {(c.status === "ENGAGED" ||
                        c.status === "QUESTION_NEEDED") && (
                        <CloseJobButton campaignId={c.id} />
                      )}
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.className}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
