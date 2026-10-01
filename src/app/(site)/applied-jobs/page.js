import { EmployeeGate } from "@components/guards/AuthGates";
import AppliedJobsPage from "@views/employee/AppliedJobsPage";

export default function Page() {
  return (
    <EmployeeGate>
      <AppliedJobsPage />
    </EmployeeGate>
  );
}
