import Link from "next/link";

import { deleteJobAction } from "@/app/actions";
import { requireRole } from "@/lib/auth";
import { getEmployerJobs } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Employer jobs" };

export default async function EmployerJobsPage() {
  const session = await requireRole("employer");
  const jobs = await getEmployerJobs(session.id);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Jobs</h1>
          <p className="muted mt-2">Create and manage your company&apos;s vacancies.</p>
        </div>
        <Link className="btn btn-primary" href="/employer/jobs/create">New job</Link>
      </div>

      <div className="mt-8 grid gap-4">
        {jobs.map((job) => {
          const remove = deleteJobAction.bind(null, job.id);
          return (
            <article className="panel rounded-2xl p-5" key={job.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="muted mt-1 text-sm">{job.location} · {job.type} · deadline {formatDate(job.deadline)}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold">{job._count.applications} applicants</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link className="btn btn-secondary" href={`/employer/jobs/${job.id}/edit`}>Edit</Link>
                <Link className="btn btn-secondary" href={`/employer/jobs/${job.id}/applications`}>Applications</Link>
                <form action={remove}><button className="btn btn-danger" type="submit">Delete</button></form>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
