import JobCard from "@/components/job-card";
import JobFilters from "@/components/job-filters";
import { api } from "@/lib/api";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const key of ["search", "location", "type", "dateListed"]) {
    if (params?.[key]) query.set(key, params[key]);
  }

  const jobs = await api(`/jobs?${query.toString()}`, { auth: false });

  return (
    <div className="shell py-14">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-400">Stars Align</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Find work that fits where you are going.</h1>
        <p className="muted mx-auto mt-5 max-w-2xl text-lg">Search open roles, review the details, and apply without jumping between disconnected tools.</p>
      </section>

      <section className="mt-12">
        <JobFilters values={params} />
        <div className="mt-6 grid gap-4">
          {jobs.length ? jobs.map((job) => <JobCard key={job._id} job={job} />) : (
            <div className="panel rounded-2xl p-10 text-center">
              <h2 className="text-xl font-bold">No jobs found</h2>
              <p className="muted mt-2">Try a broader search or remove one of the filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
