import AuthShell from "@components/layouts/AuthShell";
import { AuthGate } from "@components/guards/AuthGates";

export default function AuthenticationLayout({ children }) {
  return (
    <AuthGate>
      <AuthShell>{children}</AuthShell>
    </AuthGate>
  );
}
