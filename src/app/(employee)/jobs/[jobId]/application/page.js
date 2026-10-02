import { redirect } from "next/navigation";

import { submitApplicationAction } from "@/app/actions";
import { requireRole } from "@/lib/auth";
import { getJob } from "@/lib/data";

export default async function ApplicationPage({ params, searchParams }) {
  const session = await requireRole("employee");
  const { jobId } = await params;
  const query = await searchParams;
  const job = await getJob(jobId, session.id);

  if (!job) redirect("/");
  if (job.applied) redirect("/jobs/" + jobId + "/details");

  const action = submitApplicationAction.bind(null, jobId);

  return (
    <div className="shell py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Application</p>
        <h1 className="mt-3 text-xl font-semibold tracking-[-0.05em]">Apply for {job.title}</h1>
        <p className="muted mt-3">{job.company?.name} · {job.location} · {job.type}</p>

        <section className="surface mt-8 rounded-[1.5rem] p-6 sm:p-8">
          {query?.error && <p className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{query.error}</p>}
          <form action={action} className="grid gap-6">
            <label className="grid gap-2">
              <span className="form-label">Resume</span>
              <input accept=".pdf,.doc,.docx" className="field" name="resume" required type="file" />
              <span className="muted text-xs">PDF, DOC, or DOCX · maximum 5 MB</span>
            </label>
            <label className="grid gap-2">
              <span className="form-label">Cover letter</span>
              <textarea className="field min-h-48 resize-y" name="coverLetter" placeholder="Explain why your experience is relevant to this role." />
            </label>
            <div className="flex justify-end border-t border-white/8 pt-5">
              <button className="btn btn-primary min-w-44" type="submit">Submit application</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
