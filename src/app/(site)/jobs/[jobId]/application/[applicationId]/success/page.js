import { EmployeeGate } from "@components/guards/AuthGates";
import ApplicationSuccessPage from "@views/ApplicationSuccessPage";

export default function Page() {
  return (
    <EmployeeGate>
      <ApplicationSuccessPage />
    </EmployeeGate>
  );
}
