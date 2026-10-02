import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { getAdminApplications } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Applications" };

export default async function AdminApplicationsPage() {
  const applications = await getAdminApplications();

  return (
    <>
      <PageHeader eyebrow="Administration" title="Applications" description="Platform-level visibility into candidate application activity." />
      {applications.length ? (
        <div className="table-shell mt-7">
          <div className="table-head"><span>Candidate</span><span>Company</span><span>Role</span><span>Status</span><span>Applied</span></div>
          {applications.map((application) => (
            <div className="table-row" key={application.id}>
              <span className="font-medium">{application.user.email}</span>
              <span className="text-sm">{application.company.name}</span>
              <span className="text-sm">{application.job.title}</span>
              <StatusBadge status={application.status} />
              <span className="muted text-sm">{formatDate(application.createdAt)}</span>
            </div>
          ))}
        </div>
      ) : <div className="mt-7"><EmptyState title="No applications available" description="Application activity will appear here when available." /></div>}
    </>
  );
}
