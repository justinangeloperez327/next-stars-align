import Link from "next/link";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { requireRole } from "@/lib/auth";
import { getEmployerJob, getJobApplications } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function JobApplicationsPage({ params, searchParams }) {
  const session = await requireRole("employer");
  const { jobId } = await params;
  const query = await searchParams;
  const [job, applications] = await Promise.all([
    getEmployerJob(session.id, jobId),
    getJobApplications(session.id, jobId, query),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Role pipeline"
        title={job?.title || "Job applications"}
        description={applications.length + " application" + (applications.length === 1 ? "" : "s") + " currently visible."}
        actions={<Link className="btn btn-secondary" href={"/employer/jobs/" + jobId + "/edit"}>Edit job</Link>}
      />

      <form className="glass mt-7 grid gap-3 rounded-[1.25rem] p-3 md:grid-cols-[1fr_180px_auto]" method="GET">
        <input className="field" name="search" defaultValue={query.search || ""} placeholder="Candidate email" />
        <select className="field" name="status" defaultValue={query.status || ""}>
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
            <span>Candidate</span><span>Experience</span><span>Status</span><span>Applied</span><span />
          </div>
          {applications.map((application) => {
            const profile = application.user.employeeProfile;
            const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || application.user.email;
            const years = profile?.experience?.length || 0;

            return (
              <div className="table-row" key={application.id}>
                <div><p className="font-bold">{name}</p><p className="muted mt-1 text-xs">{application.user.email}</p></div>
                <span className="text-sm">{years} experience entr{years === 1 ? "y" : "ies"}</span>
                <StatusBadge status={application.status} />
                <span className="muted text-sm">{formatDate(application.createdAt)}</span>
                <Link className="text-sm font-bold text-violet-300" href={"/employer/applications/" + application.id + "/view"}>Review →</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6"><EmptyState title="No applicants found" description="Applications for this role will appear here when they are submitted." /></div>
      )}
    </>
  );
}
