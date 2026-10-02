import Link from "next/link";

export default async function ApplicationSuccessPage({ params }) {
  const { jobId } = await params;

  return (
    <div className="shell py-20">
      <section className="panel mx-auto max-w-xl rounded-3xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Submitted</p>
        <h1 className="mt-4 text-xl font-semibold">Application sent</h1>
        <p className="muted mt-3">Your application has been submitted successfully.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link className="btn btn-primary" href="/applied-jobs">View applications</Link>
          <Link className="btn btn-secondary" href={`/jobs/${jobId}/details`}>Back to job</Link>
        </div>
      </section>
    </div>
  );
}
