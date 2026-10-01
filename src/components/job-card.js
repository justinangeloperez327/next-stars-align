import Link from "next/link";

import { timeAgo } from "@/lib/format";

export default function JobCard({ job, status }) {
  const companyName = job.company?.name || "Company";
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <article className="job-card panel rounded-[1.35rem] p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="company-avatar" aria-hidden="true">{initial}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-violet-300">{companyName}</p>
              <h2 className="mt-1 text-xl font-extrabold tracking-[-0.02em] text-white">{job.title}</h2>
            </div>
            {status && <span className="meta-chip uppercase">{status}</span>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.location && <span className="meta-chip">{job.location}</span>}
            {job.type && <span className="meta-chip">{job.type}</span>}
            {job.salary && <span className="meta-chip">{job.salary}</span>}
            {job.createdAt && <span className="meta-chip">{timeAgo(job.createdAt)}</span>}
          </div>

          <Link
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-violet-300 hover:text-violet-200"
            href={`/jobs/${job._id}/details`}
          >
            View role <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
