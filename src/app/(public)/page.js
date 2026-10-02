import JobCard from "@/components/job-card";
import JobFilters from "@/components/job-filters";
import { listJobs } from "@/lib/data";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const jobs = await listJobs(params);

  return (
    <div className="shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Focused career discovery</p>
          <h1 className="hero-title">
            Find the role that <span className="hero-title-accent">aligns.</span>
          </h1>
          <p className="muted mt-6 max-w-2xl text-base leading-7 sm:text-lg">
            Discover opportunities from companies building what comes next, and keep your application journey clear from search to decision.
          </p>

          <div className="hero-search">
            <JobFilters values={params} />
          </div>
        </div>
      </section>

      <section className="pb-8 pt-5">
        <div className="mb-6">
          <p className="eyebrow">Open opportunities</p>
          <h2 className="section-title mt-2">Explore roles</h2>
        </div>
        <div className="grid gap-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={{ ...job, _id: job.id }} />
          ))}
        </div>
      </section>
    </div>
  );
}
