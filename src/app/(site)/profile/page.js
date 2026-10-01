import { EmployeeGate } from "@components/guards/AuthGates";
import ProfilePage from "@views/ProfilePage";

export default function Page() {
  return (
    <EmployeeGate>
      <ProfilePage />
    </EmployeeGate>
  );
}
