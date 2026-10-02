import Link from "next/link";
import { notFound } from "next/navigation";

import EmptyState from "@/components/empty-state";
import JobCard from "@/components/job-card";
import { getCompany } from "@/lib/data";

export default async function CompanyPage({ params }) {
  const { companyId } = await params;
  const company = await getCompany(companyId);

  if (!company) notFound();

  return (
    <div className="shell py-14 sm:py-20">
      <section className="glass-strong rounded-[2rem] p-7 sm:p-10">
        <div className="flex flex-wrap items-start gap-5">
          <div className="company-avatar h-16 w-16 rounded-2xl text-xl" aria-hidden="true">
            {company.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Company profile</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{company.name}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="meta-chip">{company.industry}</span>
              <span className="meta-chip">{company.location}</span>
              {company.size && <span className="meta-chip">{company.size}</span>}
            </div>
            {company.website && (
              <a className="mt-5 inline-flex font-medium text-sky-300" href={company.website} target="_blank" rel="noreferrer">
                Visit website ↗
              </a>
            )}
          </div>
        </div>

        {(company.vision || company.mission || company.values) && (
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {company.vision && <div className="info-block"><p className="info-label">Vision</p><p className="muted mt-2 leading-6">{company.vision}</p></div>}
            {company.mission && <div className="info-block"><p className="info-label">Mission</p><p className="muted mt-2 leading-6">{company.mission}</p></div>}
            {company.values && <div className="info-block"><p className="info-label">Values</p><p className="muted mt-2 leading-6">{company.values}</p></div>}
          </div>
        )}
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Opportunities</p>
            <h2 className="section-title mt-2">Open roles</h2>
          </div>
          <Link className="text-sm font-medium text-sky-300" href="/">Browse all jobs →</Link>
        </div>

        {company.jobs.length ? (
          <div className="mt-6 grid gap-3">
            {company.jobs.map((job) => (
              <JobCard key={job.id} job={{ ...job, company, _id: job.id }} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState title="No open roles" description="This company does not have any active roles listed right now." />
          </div>
        )}
      </section>
    </div>
  );
}
