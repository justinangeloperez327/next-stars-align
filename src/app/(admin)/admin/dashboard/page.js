import { AdminGate } from "@components/guards/AuthGates";
import AdminDashboardPage from "@views/admin-dashboard/DashboardPage";

export default function Page() {
  return (
    <AdminGate>
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <AdminDashboardPage />
      </main>
    </AdminGate>
  );
}
