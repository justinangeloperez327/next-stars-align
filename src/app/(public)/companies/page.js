import { listCompanies } from "@/lib/data";

export const metadata = { title: "Companies" };

export default async function CompaniesPage() {
  const companies = await listCompanies();

  return (
    <div className="shell py-14">
      <h1 className="text-3xl font-black">Companies</h1>
      <p className="muted mt-2">Employers registered on Stars Align.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {companies.map((company) => (
          <article className="panel rounded-2xl p-6" key={company.id}>
            <h2 className="text-xl font-bold">{company.name}</h2>
            <p className="muted mt-2">{company.industry}</p>
            <p className="muted mt-1 text-sm">{company.location}</p>
            {company.website && (
              <a className="mt-4 inline-block font-bold text-violet-300" href={company.website} rel="noreferrer" target="_blank">
                Visit website ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
