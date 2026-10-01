import Link from "next/link";

import { api } from "@/lib/api";

export default async function JobApplicationsPage({ params }) {
  const { jobId } = await params;
  const applications = await api(`/jobs/${jobId}/applications`);

  return (
    <>
      <h1 className="text-3xl font-black">Job applications</h1>
      <p className="muted mt-2">{applications.length} application{applications.length === 1 ? "" : "s"} received.</p>
      <div className="mt-8 grid gap-4">
        {applications.map((application) => (
          <article className="panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5" key={application._id}>
            <div>
              <h2 className="font-bold">Application {application._id.slice(-6)}</h2>
              <p className="muted mt-1 text-sm">Status: {application.status}</p>
            </div>
            <Link className="btn btn-secondary" href={`/employer/applications/${application._id}/view`}>Review</Link>
          </article>
        ))}
      </div>
    </>
  );
}
