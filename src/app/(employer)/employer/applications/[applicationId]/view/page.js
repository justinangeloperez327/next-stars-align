import { notFound } from "next/navigation";

import { acceptApplicationAction, rejectApplicationAction } from "@/app/actions";
import { requireRole } from "@/lib/auth";
import { getEmployerApplication } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function ApplicationViewPage({ params }) {
  const session = await requireRole("employer");
  const { applicationId } = await params;
  const application = await getEmployerApplication(session.id, applicationId);

  if (!application) notFound();

  const accept = acceptApplicationAction.bind(null, applicationId);
  const reject = rejectApplicationAction.bind(null, applicationId);

  return (
    <article className="panel max-w-4xl rounded-3xl p-7 sm:p-9">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Candidate application</p>
      <h1 className="mt-3 text-3xl font-black">{application.user.email}</h1>
      <p className="muted mt-2">{application.job.title} · submitted {formatDate(application.createdAt)}</p>

      <section className="mt-8">
        <h2 className="font-bold">Cover letter</h2>
        <p className="muted mt-3 whitespace-pre-line leading-7">{application.coverLetter || "No cover letter provided."}</p>
      </section>

      {application.resumeName && (
        <a className="btn btn-secondary mt-7" href={`/resumes/${application.id}`} target="_blank">
          Open resume ↗
        </a>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <form action={accept}><button className="btn bg-emerald-700 text-white" type="submit">Accept</button></form>
        <form action={reject}><button className="btn btn-danger" type="submit">Reject</button></form>
      </div>
    </article>
  );
}
