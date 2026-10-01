import { ApplicationGate, EmployeeGate } from "@components/guards/AuthGates";
import ApplicationPage from "@views/ApplicationPage";

export default function Page() {
  return (
    <EmployeeGate>
      <ApplicationGate>
        <ApplicationPage />
      </ApplicationGate>
    </EmployeeGate>
  );
}
