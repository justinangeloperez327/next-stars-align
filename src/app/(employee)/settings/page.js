import PageHeader from "@/components/page-header";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Settings" };

export default async function CandidateSettingsPage() {
  const session = await requireRole("employee");

  return (
    <div className="shell py-14 sm:py-20">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage account-level preferences separately from your professional profile."
      />
      <section className="surface mt-8 max-w-3xl rounded-[1.4rem] p-6">
        <p className="info-label">Account details</p>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div><dt className="muted text-sm">Email</dt><dd className="mt-1 font-medium">{session.email}</dd></div>
          <div><dt className="muted text-sm">Account type</dt><dd className="mt-1 font-medium">Candidate</dd></div>
        </dl>
        <div className="mt-7 border-t border-white/8 pt-5">
          <h2 className="font-semibold">Security</h2>
          <p className="muted mt-2 text-sm leading-6">Password management and recovery controls will live here when the authentication recovery flow is added.</p>
        </div>
      </section>
    </div>
  );
}
