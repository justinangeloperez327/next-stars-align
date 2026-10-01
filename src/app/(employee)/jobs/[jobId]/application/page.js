import { redirect } from "next/navigation";

import { submitApplicationAction } from "@/app/actions";
import { api } from "@/lib/api";

export default async function ApplicationPage({ params, searchParams }) {
  const { jobId } = await params;
  const query = await searchParams;
  const job = await api(`/jobs/${jobId}/details`);

  if (job.applied) redirect(`/jobs/${jobId}/details`);

  const action = submitApplicationAction.bind(null, jobId);

  return (
    <div className="shell py-14">
      <section className="panel mx-auto max-w-2xl rounded-3xl p-7 sm:p-9">
        <p className="font-bold text-violet-300">{job.company?.name}</p>
        <h1 className="mt-2 text-3xl font-black">Apply for {job.title}</h1>
        {query?.error && <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{query.error}</p>}
        <form action={action} className="mt-7 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-bold">Resume</span>
            <input accept=".pdf,.doc,.docx" className="field" name="resume" required type="file" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Cover letter</span>
            <textarea className="field min-h-48" name="coverLetter" placeholder="Tell the employer why this role fits you." />
          </label>
          <button className="btn btn-primary" type="submit">Submit application</button>
        </form>
      </section>
    </div>
  );
}
