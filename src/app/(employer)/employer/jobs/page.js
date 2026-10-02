import Link from "next/link";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { deleteJobAction } from "@/app/actions";
import { requireRole } from "@/lib/auth";
import { getEmployerJobs } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Employer jobs" };

export default async function EmployerJobsPage({ searchParams }) {
  const session = await requireRole("employer");
  const params = await searchParams;
  const jobs = await getEmployerJobs(session.id, params);

  return (
    <>
      <PageHeader
        eyebrow="Vacancies"
        title="Jobs"
        description="Create, review, and manage your company's open roles."
        actions={<Link className="btn btn-primary" href="/employer/jobs/create">Create job</Link>}
      />

      <form className="glass mt-7 grid gap-3 rounded-[1.25rem] p-3 md:grid-cols-[1fr_180px_auto]" method="GET">
        <input className="field" name="search" defaultValue={params.search || ""} placeholder="Search jobs" />
        <select className="field" name="status" defaultValue={params.status || ""}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
        <button className="btn btn-secondary" type="submit">Filter</button>
      </form>

      {jobs.length ? (
        <div className="mt-6 grid gap-3">
          {jobs.map((job) => {
            const remove = deleteJobAction.bind(null, job.id);
            const status = new Date(job.deadline) >= new Date() ? "active" : "closed";

            return (
              <article className="panel rounded-[1.35rem] p-5" key={job.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <StatusBadge status={status} />
                    </div>
                    <p className="muted mt-2 text-sm">{job.location} · {job.type} · deadline {formatDate(job.deadline)}</p>
                  </div>
                  <span className="meta-chip">{job._count.applications} applications</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link className="btn btn-primary" href={"/employer/jobs/" + job.id + "/applications"}>Applications</Link>
                  <Link className="btn btn-secondary" href={"/employer/jobs/" + job.id + "/edit"}>Edit</Link>
                  <details className="action-menu">
                    <summary className="btn btn-secondary">More</summary>
                    <div className="action-menu-popover">
                      <form action={remove}><button className="action-menu-danger" type="submit">Delete job</button></form>
                    </div>
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No jobs found"
            description="Create a role or change the filters to see more vacancies."
            action={<Link className="btn btn-primary" href="/employer/jobs/create">Create job</Link>}
          />
        </div>
      )}
    </>
  );
}
