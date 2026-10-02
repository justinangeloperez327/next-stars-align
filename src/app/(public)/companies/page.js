import Link from "next/link";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import { listCompanies } from "@/lib/data";

export const metadata = { title: "Companies" };

export default async function CompaniesPage() {
  const companies = await listCompanies();

  return (
    <div className="shell py-14 sm:py-20">
      <PageHeader
        eyebrow="Organizations"
        title="Companies"
        description="Explore employers currently using Stars Align and the opportunities they are hiring for."
      />

      {companies.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {companies.map((company) => (
            <article className="job-card panel rounded-[1.35rem] p-6" key={company.id}>
              <div className="flex items-start gap-4">
                <div className="company-avatar" aria-hidden="true">{company.name.charAt(0).toUpperCase()}</div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold tracking-[-0.02em]">{company.name}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="meta-chip">{company.industry}</span>
                    <span className="meta-chip">{company.location}</span>
                    <span className="meta-chip">{company._count.jobs} jobs</span>
                  </div>
                  <Link className="mt-5 inline-flex font-medium text-violet-300 hover:text-violet-200" href={"/companies/" + company.id}>
                    View company →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No companies available"
            description="Employer profiles will appear here when the company directory is available."
          />
        </div>
      )}
    </div>
  );
}
