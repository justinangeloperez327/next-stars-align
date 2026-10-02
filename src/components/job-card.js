import Link from "next/link";

import { timeAgo } from "@/lib/format";

export default function JobCard({ job, status }) {
  const companyName = job.company?.name || "Company";
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <article className="job-card panel rounded-[1.2rem] p-5">
      <div className="flex items-start gap-4">
        <div className="company-avatar" aria-hidden="true">{initial}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sky-300">{companyName}</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.015em] text-white">{job.title}</h2>
            </div>
            {status && <span className="meta-chip uppercase">{status}</span>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.location && <span className="meta-chip">{job.location}</span>}
            {job.type && <span className="meta-chip">{job.type}</span>}
            {job.salary && <span className="meta-chip">{job.salary}</span>}
            {job.createdAt && <span className="meta-chip">{timeAgo(job.createdAt)}</span>}
          </div>

          <Link className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-300 hover:text-sky-200" href={`/jobs/${job._id}/details`}>
            View role <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
