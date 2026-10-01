import { listCompanies } from "@/lib/data";

export const metadata = { title: "Companies" };

export default async function CompaniesPage() {
  const companies = await listCompanies();

  return (
    <div className="shell py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Organizations</p>
        <h1 className="section-title mt-2">Companies</h1>
        <p className="muted mt-3 text-base leading-7">Explore employers currently using Stars Align.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {companies.map((company) => (
          <article className="job-card panel rounded-[1.35rem] p-6" key={company.id}>
            <div className="flex items-start gap-4">
              <div className="company-avatar" aria-hidden="true">{company.name.charAt(0).toUpperCase()}</div>
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold tracking-[-0.02em]">{company.name}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="meta-chip">{company.industry}</span>
                  <span className="meta-chip">{company.location}</span>
                </div>
                {company.website && (
                  <a className="mt-5 inline-flex font-bold text-violet-300 hover:text-violet-200" href={company.website} rel="noreferrer" target="_blank">
                    Visit website ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
