import { requireRole } from "@/lib/auth";
import { getEmployerProfile } from "@/lib/data";

export const metadata = { title: "Employer profile" };

export default async function EmployerProfilePage() {
  const session = await requireRole("employer");
  const profile = await getEmployerProfile(session.id);

  if (!profile) return null;

  return (
    <section className="panel max-w-3xl rounded-3xl p-8">
      <h1 className="text-3xl font-black">Employer profile</h1>
      <p className="muted mt-2">Your account and company information.</p>
      <dl className="mt-8 grid gap-5 sm:grid-cols-2">
        <div><dt className="muted text-sm">Email</dt><dd className="mt-1 font-bold">{profile.user.email}</dd></div>
        <div><dt className="muted text-sm">Company</dt><dd className="mt-1 font-bold">{profile.company.name}</dd></div>
        <div><dt className="muted text-sm">Industry</dt><dd className="mt-1 font-bold">{profile.company.industry}</dd></div>
        <div><dt className="muted text-sm">Location</dt><dd className="mt-1 font-bold">{profile.company.location}</dd></div>
      </dl>
    </section>
  );
}
