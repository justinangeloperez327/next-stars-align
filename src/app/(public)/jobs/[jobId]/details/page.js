import Link from "next/link";
import { notFound } from "next/navigation";

import { api, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { getSession } from "@/lib/auth";

export default async function JobDetailsPage({ params }) {
  const { jobId } = await params;
  const session = await getSession();

  let job;
  try {
    job = await api(`/jobs/${jobId}${session ? "/details" : ""}`, { auth: Boolean(session) });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <div className="shell py-14">
      <article className="panel rounded-3xl p-7 sm:p-10">
        <p className="font-bold text-violet-300">{job.company?.name || "Company"}</p>
        <h1 className="mt-2 text-4xl font-black">{job.title}</h1>
        <div className="muted mt-5 flex flex-wrap gap-4 text-sm">
          <span>{job.location}</span>
          <span>{job.type}</span>
          <span>Deadline {formatDate(job.deadline)}</span>
          {job.salary && <span>{job.salary}</span>}
        </div>

        <div className="mt-9 grid gap-8">
          <section>
            <h2 className="text-lg font-bold">About the role</h2>
            <p className="muted mt-3 whitespace-pre-line leading-7">{job.description}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold">Requirements</h2>
            <p className="muted mt-3 whitespace-pre-line leading-7">{job.requirements}</p>
          </section>
          <section className="grid gap-2 text-sm sm:grid-cols-2">
            <p><strong>Experience:</strong> {job.experience ?? 0} years</p>
            <p><strong>Education:</strong> {job.education || "Not specified"}</p>
          </section>
        </div>

        <div className="mt-10">
          {session?.user?.role === "employee" ? (
            job.applied ? (
              <span className="btn btn-secondary cursor-default">Already applied</span>
            ) : (
              <Link className="btn btn-primary" href={`/jobs/${jobId}/application`}>Apply now</Link>
            )
          ) : (
            <Link className="btn btn-primary" href="/login">Login to apply</Link>
          )}
        </div>
      </article>
    </div>
  );
}
