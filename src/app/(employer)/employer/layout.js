import DashboardShell from "@components/layouts/DashboardShell";
import { EmployerGate } from "@components/guards/AuthGates";

export default function EmployerLayout({ children }) {
  return (
    <EmployerGate>
      <DashboardShell>{children}</DashboardShell>
    </EmployerGate>
  );
}
