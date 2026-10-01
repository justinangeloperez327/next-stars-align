import DefaultShell from "@components/layouts/DefaultShell";
import { PublicGate } from "@components/guards/AuthGates";

export default function SiteLayout({ children }) {
  return (
    <PublicGate>
      <DefaultShell>{children}</DefaultShell>
    </PublicGate>
  );
}
