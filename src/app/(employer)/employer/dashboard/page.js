import { api } from "@/lib/api";

export const metadata = { title: "Employer dashboard" };

const cards = [
  ["Total jobs", "totalJobs"],
  ["Active jobs", "totalActiveJobs"],
  ["Closed jobs", "totalCloseJobs"],
  ["Applications", "totalApplications"],
  ["Accepted", "totalAccepted"],
  ["Rejected", "totalRejected"],
];

export default async function EmployerDashboardPage() {
  const dashboard = await api("/dashboard");

  return (
    <>
      <h1 className="text-3xl font-black">Dashboard</h1>
      <p className="muted mt-2">A current snapshot of your hiring activity.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, key]) => (
          <article className="panel rounded-2xl p-6" key={key}>
            <p className="muted text-sm">{label}</p>
            <p className="mt-2 text-4xl font-black">{dashboard[key] ?? 0}</p>
          </article>
        ))}
      </div>
    </>
  );
}
