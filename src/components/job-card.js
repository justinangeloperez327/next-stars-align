import Link from "next/link";

import { timeAgo } from "@/lib/format";

export default function JobCard({ job, status }) {
  return (
    <article className="panel rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-violet-500/60">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-violet-300">{job.company?.name || "Company"}</p>
          <h2 className="mt-1 text-xl font-bold">{job.title}</h2>
        </div>
        {status && (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {status}
          </span>
        )}
      </div>
      <div className="muted mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <span>{job.location}</span>
        <span>{job.type}</span>
        {job.salary && <span>{job.salary}</span>}
        {job.createdAt && <span>{timeAgo(job.createdAt)}</span>}
      </div>
      <Link className="mt-5 inline-flex font-bold text-violet-300 hover:text-violet-200" href={`/jobs/${job._id}/details`}>
        View role →
      </Link>
    </article>
  );
}
