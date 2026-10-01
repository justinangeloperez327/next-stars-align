import SiteShell from "@/components/site-shell";
import { requireRole } from "@/lib/auth";

export default async function EmployeeLayout({ children }) {
  await requireRole("employee");
  return <SiteShell>{children}</SiteShell>;
}
