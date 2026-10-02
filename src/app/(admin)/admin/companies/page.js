import Link from "next/link";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import { getAdminCompanies } from "@/lib/data";

export const metadata = { title: "Companies" };

export default async function AdminCompaniesPage() {
  const companies = await getAdminCompanies();

  return (
    <>
      <PageHeader eyebrow="Administration" title="Companies" description="Monitor employer organizations and their activity across the platform." />
      {companies.length ? (
        <div className="table-shell mt-7">
          <div className="table-head"><span>Company</span><span>Industry</span><span>Jobs</span><span>Applications</span><span /></div>
          {companies.map((company) => (
            <div className="table-row" key={company.id}>
              <div><p className="font-medium">{company.name}</p><p className="muted mt-1 text-xs">{company.location}</p></div>
              <span className="text-sm">{company.industry}</span>
              <span className="text-sm">{company._count.jobs}</span>
              <span className="text-sm">{company._count.applications}</span>
              <Link className="text-sm font-medium text-violet-300" href={"/companies/" + company.id}>View →</Link>
            </div>
          ))}
        </div>
      ) : <div className="mt-7"><EmptyState title="No companies available" description="Company records will appear here when available." /></div>}
    </>
  );
}
