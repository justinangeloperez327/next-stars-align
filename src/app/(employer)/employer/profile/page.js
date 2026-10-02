import PageHeader from "@/components/page-header";
import { requireRole } from "@/lib/auth";
import { getEmployerProfile } from "@/lib/data";

export const metadata = { title: "Company profile" };

export default async function EmployerProfilePage() {
  const session = await requireRole("employer");
  const profile = await getEmployerProfile(session.id);

  if (!profile) return null;

  const company = profile.company;

  return (
    <>
      <PageHeader
        eyebrow="Public identity"
        title="Company Profile"
        description="This information represents your organization across Stars Align."
      />

      <section className="glass-strong mt-8 max-w-4xl rounded-[1.7rem] p-7">
        <div className="flex flex-wrap items-start gap-5">
          <div className="company-avatar h-16 w-16 rounded-2xl text-xl" aria-hidden="true">{company.name.charAt(0).toUpperCase()}</div>
          <div>
            <h2 className="text-2xl font-black">{company.name}</h2>
            <p className="muted mt-2">{company.industry} · {company.location}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="info-block"><dt className="info-label">Account email</dt><dd className="mt-2 font-bold">{profile.user.email}</dd></div>
          <div className="info-block"><dt className="info-label">Company size</dt><dd className="mt-2 font-bold">{company.size || "Not specified"}</dd></div>
          <div className="info-block"><dt className="info-label">Website</dt><dd className="mt-2 font-bold">{company.website || "Not specified"}</dd></div>
          <div className="info-block"><dt className="info-label">Location</dt><dd className="mt-2 font-bold">{company.location}</dd></div>
        </dl>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="info-block"><p className="info-label">Vision</p><p className="muted mt-2 leading-6">{company.vision || "Not provided"}</p></div>
          <div className="info-block"><p className="info-label">Mission</p><p className="muted mt-2 leading-6">{company.mission || "Not provided"}</p></div>
          <div className="info-block"><p className="info-label">Values</p><p className="muted mt-2 leading-6">{company.values || "Not provided"}</p></div>
        </div>
      </section>
    </>
  );
}
