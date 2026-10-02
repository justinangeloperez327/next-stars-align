import AdminShell from "@/components/admin-shell";
import { requireRole } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const session = await requireRole("admin");
  return <AdminShell user={session}>{children}</AdminShell>;
}
