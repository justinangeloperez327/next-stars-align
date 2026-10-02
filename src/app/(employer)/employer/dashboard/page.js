import Link from "next/link";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { requireRole } from "@/lib/auth";
import { getEmployerDashboard } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Employer dashboard" };

const metrics = [
  ["Active jobs", "totalActiveJobs"],
  ["Applications", "totalApplications"],
  ["Awaiting review", "awaitingReview"],
  ["Accepted", "totalAccepted"],
];

export default async function EmployerDashboardPage() {
  const session = await requireRole("employer");
  const dashboard = await getEmployerDashboard(session.id);

  return (
    <>
      <PageHeader
        eyebrow="Hiring overview"
        title="Dashboard"
        description="See what needs attention across your open roles and candidate pipeline."
        actions={<Link className="btn btn-primary" href="/employer/jobs/create">Create job</Link>}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, key]) => (
          <article className="dashboard-card panel rounded-[1.35rem] p-6" key={key}>
            <p className="text-sm font-semibold text-white/55">{label}</p>
            <p className="mt-4 text-xl font-semibold tracking-[-0.05em]">{dashboard?.[key] ?? 0}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="surface rounded-[1.4rem] p-5 sm:p-6">
          <div className="section-heading">
            <div><p className="info-label">Candidate activity</p><h2 className="mt-2 text-xl font-semibold">Recent applications</h2></div>
            <Link className="text-sm font-medium text-sky-300" href="/employer/applications">View all →</Link>
          </div>

          {dashboard?.recentApplications?.length ? (
            <div className="mt-5 data-list">
              {dashboard.recentApplications.map((application) => {
                const profile = application.user.employeeProfile;
                const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || application.user.email;
                return (
                  <Link className="data-row" href={"/employer/applications/" + application.id + "/view"} key={application.id}>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{name}</p>
                      <p className="muted mt-1 truncate text-sm">{application.job.title}</p>
                    </div>
                    <StatusBadge status={application.status} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-5"><EmptyState title="No applications yet" description="New candidate applications will appear here." /></div>
          )}
        </section>

        <section className="surface rounded-[1.4rem] p-5 sm:p-6">
          <p className="info-label">Needs attention</p>
          <h2 className="mt-2 text-xl font-semibold">Closing soon</h2>
          {dashboard?.closingSoon?.length ? (
            <div className="mt-5 grid gap-3">
              {dashboard.closingSoon.map((job) => (
                <Link className="attention-card" href={"/employer/jobs/" + job.id + "/edit"} key={job.id}>
                  <p className="font-medium">{job.title}</p>
                  <p className="muted mt-1 text-sm">Deadline {formatDate(job.deadline)} · {job._count.applications} applications</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="muted mt-5 text-sm">No jobs are closing in the next seven days.</p>
          )}
        </section>
      </div>
    </>
  );
}
