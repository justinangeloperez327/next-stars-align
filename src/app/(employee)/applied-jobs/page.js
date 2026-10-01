import JobCard from "@/components/job-card";
import JobFilters from "@/components/job-filters";
import { api } from "@/lib/api";

export const metadata = { title: "Applied jobs" };

export default async function AppliedJobsPage({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const key of ["search", "location", "type", "dateListed"]) {
    if (params?.[key]) query.set(key, params[key]);
  }

  const jobs = await api(`/jobs/applied-jobs?${query.toString()}`);

  return (
    <div className="shell py-14">
      <h1 className="text-3xl font-black">Applied jobs</h1>
      <p className="muted mt-2">Track every role you have applied for.</p>
      <div className="mt-8"><JobFilters values={params} /></div>
      <div className="mt-6 grid gap-4">
        {jobs.length ? jobs.map((job) => <JobCard job={job} key={job._id} status={job.status} />) : (
          <div className="panel rounded-2xl p-10 text-center">
            <h2 className="text-xl font-bold">No applications yet</h2>
            <p className="muted mt-2">Your applied roles will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
