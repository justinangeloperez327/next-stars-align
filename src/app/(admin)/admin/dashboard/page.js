import { requireRole } from "@/lib/auth";
import { getAdminDashboard } from "@/lib/data";

export const metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  await requireRole("admin");
  const dashboard = await getAdminDashboard();

  return (
    <main className="shell py-14">
      <h1 className="text-3xl font-black">Admin dashboard</h1>
      <p className="muted mt-2">Platform-wide job and application totals.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(dashboard).map(([key, value]) => (
          <article className="panel rounded-2xl p-6" key={key}>
            <p className="muted text-sm">{key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</p>
            <p className="mt-2 text-4xl font-black">{value}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
