import JobCard from "@/components/job-card";
import JobFilters from "@/components/job-filters";
import { listJobs } from "@/lib/data";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const jobs = await listJobs(params);

  return (
    <div className="shell py-14">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-400">Stars Align</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Find work that fits where you are going.</h1>
        <p className="muted mx-auto mt-5 max-w-2xl text-lg">Search open roles, review the details, and apply from one full-stack Next.js application.</p>
      </section>

      <section className="mt-12">
        <JobFilters values={params} />
        <div className="mt-6 grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={{ ...job, _id: job.id }} />
          ))}
        </div>
      </section>
    </div>
  );
}
