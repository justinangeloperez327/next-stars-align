import Link from "next/link";

import { api } from "@/lib/api";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage() {
  const applications = await api("/applications");

  return (
    <>
      <h1 className="text-3xl font-black">Applications</h1>
      <p className="muted mt-2">Review candidates across all your vacancies.</p>
      <div className="mt-8 grid gap-4">
        {applications.map((application) => (
          <article className="panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5" key={application._id}>
            <div>
              <h2 className="font-bold">{application.user?.email || "Candidate"}</h2>
              <p className="muted mt-1 text-sm">{application.job?.title || "Job"} · {application.status}</p>
            </div>
            <Link className="btn btn-secondary" href={`/employer/applications/${application._id}/view`}>Review</Link>
          </article>
        ))}
      </div>
    </>
  );
}
