import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { getAdminJobs } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Jobs" };

export default async function AdminJobsPage() {
  const jobs = await getAdminJobs();
  const now = new Date();

  return (
    <>
      <PageHeader eyebrow="Administration" title="Jobs" description="Review job activity across all employers on Stars Align." />
      {jobs.length ? (
        <div className="table-shell mt-7">
          <div className="table-head"><span>Job</span><span>Company</span><span>Status</span><span>Applications</span><span>Deadline</span></div>
          {jobs.map((job) => (
            <div className="table-row" key={job.id}>
              <div><p className="font-bold">{job.title}</p><p className="muted mt-1 text-xs">{job.location} · {job.type}</p></div>
              <span className="text-sm">{job.company.name}</span>
              <StatusBadge status={new Date(job.deadline) >= now ? "active" : "closed"} />
              <span className="text-sm">{job._count.applications}</span>
              <span className="muted text-sm">{formatDate(job.deadline)}</span>
            </div>
          ))}
        </div>
      ) : <div className="mt-7"><EmptyState title="No jobs available" description="Job records will appear here when available." /></div>}
    </>
  );
}
