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
          <p className="eyebrow">The work should fit the direction</p>
          <h1 className="hero-title">
            Find the role that <span className="hero-title-accent">aligns.</span>
          </h1>
          <p className="muted mt-6 text-base leading-7 sm:text-lg">
            A focused place to discover opportunities, track applications, and manage hiring without the usual noise.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="meta-chip">Discover roles</span>
            <span className="meta-chip">Track applications</span>
            <span className="meta-chip">Manage hiring</span>
          </div>
        </div>

        <div className="hero-visual glass" aria-hidden="true">
          <div className="hero-card-stack">
            <div className="hero-card glass-strong">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Search</p>
              <p className="mt-2 text-lg font-extrabold">Find roles with less friction</p>
            </div>
            <div className="hero-card glass-strong">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Apply</p>
              <p className="mt-2 text-xl font-extrabold">Keep every opportunity in view</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 to-sky-400" />
              </div>
            </div>
            <div className="hero-card glass-strong">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Grow</p>
              <p className="mt-2 text-lg font-extrabold">Move toward the right work</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 pt-7">
        <div className="mb-6">
          <p className="eyebrow">Open opportunities</p>
          <h2 className="section-title mt-2">Explore roles</h2>
        </div>
        <JobFilters values={params} />
        <div className="mt-5 grid gap-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={{ ...job, _id: job.id }} />
          ))}
        </div>
      </section>
    </div>
  );
}
