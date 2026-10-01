import Link from "next/link";

import { requireRole } from "@/lib/auth";
import { getJobApplications } from "@/lib/data";

export default async function JobApplicationsPage({ params }) {
  const session = await requireRole("employer");
  const { jobId } = await params;
  const applications = await getJobApplications(session.id, jobId);

  return (
    <>
      <h1 className="text-3xl font-black">Job applications</h1>
      <p className="muted mt-2">{applications.length} application{applications.length === 1 ? "" : "s"} received.</p>
      <div className="mt-8 grid gap-4">
        {applications.map((application) => (
          <article className="panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5" key={application.id}>
            <div>
              <h2 className="font-bold">{application.user.email}</h2>
              <p className="muted mt-1 text-sm">Status: {application.status}</p>
            </div>
            <Link className="btn btn-secondary" href={`/employer/applications/${application.id}/view`}>Review</Link>
          </article>
        ))}
      </div>
    </>
  );
}
