import { api } from "@/lib/api";

export const metadata = { title: "Companies" };

export default async function CompaniesPage() {
  const jobs = await api("/jobs", { auth: false });
  const companies = Array.from(
    new Map(
      jobs
        .filter((job) => job.company?._id)
        .map((job) => [job.company._id, job.company]),
    ).values(),
  );

  return (
    <div className="shell py-14">
      <h1 className="text-3xl font-black">Companies</h1>
      <p className="muted mt-2">Employers currently publishing opportunities on Stars Align.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {companies.map((company) => (
          <article className="panel rounded-2xl p-6" key={company._id}>
            <h2 className="text-xl font-bold">{company.name}</h2>
            <p className="muted mt-2">{company.industry || "Industry not specified"}</p>
            <p className="muted mt-1 text-sm">{company.location || "Location not specified"}</p>
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
