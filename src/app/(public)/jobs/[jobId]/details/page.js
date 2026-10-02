import Link from "next/link";
import { notFound } from "next/navigation";

import { getSession } from "@/lib/auth";
import { getJob } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function JobDetailsPage({ params }) {
  const { jobId } = await params;
  const session = await getSession();
  const job = await getJob(jobId, session?.role === "employee" ? session.id : null);

  if (!job) notFound();

  return (
    <div className="shell py-14 sm:py-20">
      <div className="job-detail-layout">
        <article className="glass-strong rounded-[2rem] p-7 sm:p-10">
          <Link className="text-sm font-medium text-violet-300" href={"/companies/" + job.companyId}>
            {job.company?.name || "Company"}
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-3xl">{job.title}</h1>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="meta-chip">{job.location}</span>
            <span className="meta-chip">{job.type}</span>
            {job.salary && <span className="meta-chip">{job.salary}</span>}
            <span className="meta-chip">Deadline {formatDate(job.deadline)}</span>
          </div>

          <div className="mt-10 grid gap-9">
            <section>
              <p className="info-label">About the role</p>
              <p className="muted mt-3 whitespace-pre-line leading-8">{job.description}</p>
            </section>
            <section>
              <p className="info-label">Requirements</p>
              <p className="muted mt-3 whitespace-pre-line leading-8">{job.requirements}</p>
            </section>
            <section className="grid gap-4 sm:grid-cols-2">
              <div className="info-block"><p className="info-label">Experience</p><p className="mt-2 font-medium">{job.experience ?? 0} years</p></div>
              <div className="info-block"><p className="info-label">Education</p><p className="mt-2 font-medium">{job.education || "Not specified"}</p></div>
            </section>
          </div>
        </article>

        <aside className="job-detail-aside">
          <div className="panel rounded-[1.35rem] p-5">
            <p className="info-label">Ready to apply?</p>
            <p className="muted mt-2 text-sm leading-6">Review the role carefully, then submit your application when you are ready.</p>
            <div className="mt-5">
              {session?.role === "employee" ? (
                job.applied ? (
                  <span className="btn btn-secondary w-full cursor-default">Already applied</span>
                ) : (
                  <Link className="btn btn-primary w-full" href={"/jobs/" + jobId + "/application"}>Apply now</Link>
                )
              ) : (
                <Link className="btn btn-primary w-full" href="/login">Login to apply</Link>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
