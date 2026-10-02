import EmployerShell from "@/components/employer-shell";
import { requireRole } from "@/lib/auth";

export default async function EmployerLayout({ children }) {
  const session = await requireRole("employer");
  return <EmployerShell user={session}>{children}</EmployerShell>;
}
