import Link from "next/link";

import EmptyState from "@/components/empty-state";
import JobCard from "@/components/job-card";
import PageHeader from "@/components/page-header";
import { requireRole } from "@/lib/auth";
import { listAppliedJobs } from "@/lib/data";

export const metadata = { title: "Applied jobs" };

const tabs = [
  ["", "All"],
  ["submitted", "Submitted"],
  ["reviewed", "Reviewed"],
  ["accepted", "Accepted"],
  ["rejected", "Rejected"],
];

export default async function AppliedJobsPage({ searchParams }) {
  const session = await requireRole("employee");
  const params = await searchParams;
  const jobs = await listAppliedJobs(session.id, params);

  return (
    <div className="shell py-14 sm:py-20">
      <PageHeader
        eyebrow="Candidate workspace"
        title="Applied jobs"
        description="Track the roles you have applied for and their current status."
      />

      <nav className="segmented-control mt-7" aria-label="Application status">
        {tabs.map(([value, label]) => {
          const active = (params.status || "") === value;
          const href = value ? "/applied-jobs?status=" + value : "/applied-jobs";
          return <Link className={active ? "segment-active" : "segment"} href={href} key={label}>{label}</Link>;
        })}
      </nav>

      {jobs.length ? (
        <div className="mt-6 grid gap-3">
          {jobs.map((job) => (
            <JobCard job={{ ...job, _id: job.id }} key={job.id} status={job.status} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No applications here"
            description="Applications matching this status will appear here when available."
            action={<Link className="btn btn-primary" href="/">Browse jobs</Link>}
          />
        </div>
      )}
    </div>
  );
}
