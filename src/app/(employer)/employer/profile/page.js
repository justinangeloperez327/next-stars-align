import { api } from "@/lib/api";

export const metadata = { title: "Employer profile" };

export default async function EmployerProfilePage() {
  const data = await api("/profile");

  return (
    <section className="panel max-w-3xl rounded-3xl p-8">
      <h1 className="text-3xl font-black">Employer profile</h1>
      <p className="muted mt-2">Account and company relationship from the current backend profile.</p>
      <dl className="mt-8 grid gap-5 sm:grid-cols-2">
        <div><dt className="muted text-sm">Email</dt><dd className="mt-1 font-bold">{data.user?.email || "—"}</dd></div>
        <div><dt className="muted text-sm">Role</dt><dd className="mt-1 font-bold">{data.user?.role || "employer"}</dd></div>
        <div><dt className="muted text-sm">Employer ID</dt><dd className="mt-1 break-all font-mono text-sm">{data.employer?._id || "—"}</dd></div>
        <div><dt className="muted text-sm">Company ID</dt><dd className="mt-1 break-all font-mono text-sm">{data.employer?.company || "—"}</dd></div>
      </dl>
    </section>
  );
}
