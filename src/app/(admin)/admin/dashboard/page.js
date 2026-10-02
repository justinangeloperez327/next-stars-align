import Link from "next/link";

import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { getAdminDashboard } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  const dashboard = await getAdminDashboard();

  const metrics = [
    ["Users", dashboard.totalUsers],
    ["Companies", dashboard.totalCompanies],
    ["Jobs", dashboard.totalJobs],
    ["Active jobs", dashboard.totalActiveJobs],
    ["Applications", dashboard.totalApplications],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Platform overview"
        title="Dashboard"
        description="A concise operational view of Stars Align activity."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(([label, value]) => (
          <article className="dashboard-card panel rounded-[1.35rem] p-5" key={label}>
            <p className="text-sm font-semibold text-white/55">{label}</p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="surface rounded-[1.4rem] p-6">
          <div className="section-heading"><div><p className="info-label">Recent activity</p><h2 className="mt-2 text-xl font-semibold">New users</h2></div><Link className="text-sm font-medium text-violet-300" href="/admin/users">View users →</Link></div>
          <div className="mt-5 data-list">
            {dashboard.recentUsers.map((user) => (
              <div className="data-row" key={user.id}><div><p className="font-medium">{user.email}</p><p className="muted mt-1 text-xs">{formatDate(user.createdAt)}</p></div><StatusBadge status={user.role} /></div>
            ))}
          </div>
        </section>

        <section className="surface rounded-[1.4rem] p-6">
          <div className="section-heading"><div><p className="info-label">Recent activity</p><h2 className="mt-2 text-xl font-semibold">New jobs</h2></div><Link className="text-sm font-medium text-violet-300" href="/admin/jobs">View jobs →</Link></div>
          <div className="mt-5 data-list">
            {dashboard.recentJobs.map((job) => (
              <div className="data-row" key={job.id}><div><p className="font-medium">{job.title}</p><p className="muted mt-1 text-xs">{job.company.name}</p></div><span className="muted text-sm">{formatDate(job.createdAt)}</span></div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
