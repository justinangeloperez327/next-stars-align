import Link from "next/link";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { requireRole } from "@/lib/auth";
import { getEmployerApplications, getEmployerJobs } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage({ searchParams }) {
  const session = await requireRole("employer");
  const params = await searchParams;
  const [applications, jobs] = await Promise.all([
    getEmployerApplications(session.id, params),
    getEmployerJobs(session.id),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Candidate pipeline"
        title="Applications"
        description="Review candidates across every role from one focused workspace."
      />

      <form className="glass mt-7 grid gap-3 rounded-[1.25rem] p-3 md:grid-cols-[1fr_220px_180px_auto]" method="GET">
        <input className="field" name="search" defaultValue={params.search || ""} placeholder="Candidate email" />
        <select className="field" name="job" defaultValue={params.job || ""}>
          <option value="">All jobs</option>
          {jobs.map((job) => <option value={job.id} key={job.id}>{job.title}</option>)}
        </select>
        <select className="field" name="status" defaultValue={params.status || ""}>
          <option value="">All statuses</option>
          <option value="submitted">Submitted</option>
          <option value="reviewed">Reviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button className="btn btn-secondary" type="submit">Filter</button>
      </form>

      {applications.length ? (
        <div className="table-shell mt-6">
          <div className="table-head">
            <span>Candidate</span><span>Role</span><span>Status</span><span>Applied</span><span />
          </div>
          {applications.map((application) => {
            const profile = application.user.employeeProfile;
            const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || application.user.email;

            return (
              <div className="table-row" key={application.id}>
                <div><p className="font-bold">{name}</p><p className="muted mt-1 text-xs">{application.user.email}</p></div>
                <span className="text-sm">{application.job.title}</span>
                <StatusBadge status={application.status} />
                <span className="muted text-sm">{formatDate(application.createdAt)}</span>
                <Link className="text-sm font-bold text-violet-300" href={"/employer/applications/" + application.id + "/view"}>Review →</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6"><EmptyState title="No applications found" description="Candidate applications matching these filters will appear here." /></div>
      )}
    </>
  );
}
