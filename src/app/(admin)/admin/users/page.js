import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { getAdminUsers } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Users" };

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <>
      <PageHeader eyebrow="Administration" title="Users" description="Review candidate, employer, and administrator accounts across the platform." />
      {users.length ? (
        <div className="table-shell mt-7">
          <div className="table-head"><span>User</span><span>Role</span><span>Organization</span><span>Joined</span><span /></div>
          {users.map((user) => {
            const name = [user.employeeProfile?.firstName, user.employeeProfile?.lastName].filter(Boolean).join(" ") || user.email;
            const organization = user.employerProfile?.company?.name || "—";
            return (
              <div className="table-row" key={user.id}>
                <div><p className="font-bold">{name}</p><p className="muted mt-1 text-xs">{user.email}</p></div>
                <StatusBadge status={user.role} />
                <span className="text-sm">{organization}</span>
                <span className="muted text-sm">{formatDate(user.createdAt)}</span>
                <span />
              </div>
            );
          })}
        </div>
      ) : <div className="mt-7"><EmptyState title="No users available" description="User accounts will appear here when the database is available." /></div>}
    </>
  );
}
