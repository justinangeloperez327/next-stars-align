import PageHeader from "@/components/page-header";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Admin settings" };

export default async function AdminSettingsPage() {
  const session = await requireRole("admin");

  return (
    <>
      <PageHeader eyebrow="Administration" title="Settings" description="Platform and administrator preferences will be managed from this area." />
      <section className="surface mt-8 max-w-3xl rounded-[1.4rem] p-6">
        <p className="info-label">Administrator account</p>
        <p className="mt-3 font-bold">{session.email}</p>
        <p className="muted mt-5 text-sm leading-6">Operational settings are intentionally kept separate from the dashboard so the main workspace remains focused on platform activity.</p>
      </section>
    </>
  );
}
