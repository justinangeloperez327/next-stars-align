import { notFound } from "next/navigation";

import { acceptApplicationAction, rejectApplicationAction } from "@/app/actions";
import { api, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default async function ApplicationViewPage({ params }) {
  const { applicationId } = await params;
  let application;

  try {
    application = await api(`/applications/${applicationId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const accept = acceptApplicationAction.bind(null, applicationId);
  const reject = rejectApplicationAction.bind(null, applicationId);

  return (
    <article className="panel max-w-4xl rounded-3xl p-7 sm:p-9">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Candidate application</p>
      <h1 className="mt-3 text-3xl font-black">{application.user?.email || "Candidate"}</h1>
      <p className="muted mt-2">{application.job?.title || "Job"} · submitted {formatDate(application.createdAt || application.appliedAt)}</p>

      <section className="mt-8">
        <h2 className="font-bold">Cover letter</h2>
        <p className="muted mt-3 whitespace-pre-line leading-7">{application.coverLetter || "No cover letter provided."}</p>
      </section>

      {application.resume && (
        <a className="btn btn-secondary mt-7" href={application.resume} rel="noreferrer" target="_blank">Open resume ↗</a>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <form action={accept}><button className="btn bg-emerald-700 text-white" type="submit">Accept</button></form>
        <form action={reject}><button className="btn btn-danger" type="submit">Reject</button></form>
      </div>
    </article>
  );
}
