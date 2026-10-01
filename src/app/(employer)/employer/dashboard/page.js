import { requireRole } from "@/lib/auth";
import { getEmployerDashboard } from "@/lib/data";

export const metadata = { title: "Employer dashboard" };

const cards = [
  ["Total jobs", "totalJobs"],
  ["Active jobs", "totalActiveJobs"],
  ["Closed jobs", "totalCloseJobs"],
  ["Applications", "totalApplications"],
  ["Accepted", "totalAccepted"],
  ["Rejected", "totalRejected"],
];

export default async function EmployerDashboardPage() {
  const session = await requireRole("employer");
  const dashboard = await getEmployerDashboard(session.id);

  return (
    <>
      <p className="eyebrow">Overview</p>
      <h1 className="section-title mt-2">Dashboard</h1>
      <p className="muted mt-3 max-w-2xl">A concise view of the hiring activity that needs your attention.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, key], index) => (
          <article className="dashboard-card panel rounded-[1.35rem] p-6" key={key}>
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white/55">{label}</p>
                <span className="h-2 w-2 rounded-full bg-violet-400/70" aria-hidden="true" />
              </div>
              <p className="mt-4 text-4xl font-black tracking-[-0.05em]">{dashboard?.[key] ?? 0}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/30">
                {index < 3 ? "Job activity" : "Candidate activity"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
