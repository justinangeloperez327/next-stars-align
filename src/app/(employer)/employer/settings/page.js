import PageHeader from "@/components/page-header";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Employer settings" };

export default async function EmployerSettingsPage() {
  const session = await requireRole("employer");

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Account-level security and workspace preferences belong here, separate from the public company profile."
      />
      <section className="surface mt-8 max-w-3xl rounded-[1.4rem] p-6">
        <p className="info-label">Account</p>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div><dt className="muted text-sm">Email</dt><dd className="mt-1 font-bold">{session.email}</dd></div>
          <div><dt className="muted text-sm">Workspace role</dt><dd className="mt-1 font-bold">Employer</dd></div>
        </dl>
        <div className="mt-7 border-t border-white/8 pt-5">
          <h2 className="font-extrabold">Security and notifications</h2>
          <p className="muted mt-2 text-sm leading-6">Password recovery, account security, and notification preferences will be managed from this area as those workflows are introduced.</p>
        </div>
      </section>
    </>
  );
}
