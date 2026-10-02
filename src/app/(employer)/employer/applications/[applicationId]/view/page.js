import { notFound } from "next/navigation";

import { acceptApplicationAction, rejectApplicationAction } from "@/app/actions";
import PageHeader from "@/components/page-header";
import StatusBadge from "@/components/status-badge";
import { requireRole } from "@/lib/auth";
import { getEmployerApplication } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function ApplicationViewPage({ params }) {
  const session = await requireRole("employer");
  const { applicationId } = await params;
  const application = await getEmployerApplication(session.id, applicationId);

  if (!application) notFound();

  const accept = acceptApplicationAction.bind(null, applicationId);
  const reject = rejectApplicationAction.bind(null, applicationId);
  const profile = application.user.employeeProfile;
  const name = [profile?.firstName, profile?.middleName, profile?.lastName].filter(Boolean).join(" ") || application.user.email;

  return (
    <>
      <PageHeader
        eyebrow="Candidate application"
        title={name}
        description={application.job.title + " · submitted " + formatDate(application.createdAt)}
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <section className="surface rounded-[1.4rem] p-6">
            <p className="info-label">Candidate</p>
            <p className="mt-3 font-medium">{application.user.email}</p>
            {profile?.skills?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">{profile.skills.map((skill) => <span className="meta-chip" key={skill}>{skill}</span>)}</div>
            )}
          </section>

          <section className="panel rounded-[1.4rem] p-6">
            <p className="info-label">Cover letter</p>
            <p className="muted mt-3 whitespace-pre-line leading-7">{application.coverLetter || "No cover letter provided."}</p>
          </section>

          {profile?.experience?.length > 0 && (
            <section className="surface rounded-[1.4rem] p-6">
              <p className="info-label">Experience</p>
              <div className="mt-4 grid gap-4">
                {profile.experience.map((item) => (
                  <div className="info-block" key={item.id}>
                    <p className="font-medium">{item.title}</p>
                    <p className="muted mt-1 text-sm">{item.company}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {profile?.education?.length > 0 && (
            <section className="surface rounded-[1.4rem] p-6">
              <p className="info-label">Education</p>
              <div className="mt-4 grid gap-4">
                {profile.education.map((item) => (
                  <div className="info-block" key={item.id}>
                    <p className="font-medium">{item.school}</p>
                    <p className="muted mt-1 text-sm">{item.degree || "Degree not specified"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="application-sidebar">
          <div className="glass-strong rounded-[1.4rem] p-5">
            <p className="info-label">Application status</p>
            <div className="mt-3"><StatusBadge status={application.status} /></div>
            <dl className="mt-6 grid gap-4 text-sm">
              <div><dt className="muted">Applied</dt><dd className="mt-1 font-medium">{formatDate(application.createdAt)}</dd></div>
              <div><dt className="muted">Role</dt><dd className="mt-1 font-medium">{application.job.title}</dd></div>
            </dl>

            {application.resumeName && (
              <a className="btn btn-secondary mt-6 w-full" href={"/resumes/" + application.id} target="_blank">Open resume ↗</a>
            )}

            <div className="mt-6 grid gap-2 border-t border-white/8 pt-5">
              <form action={accept}><button className="btn btn-primary w-full" type="submit">Accept candidate</button></form>
              <form action={reject}><button className="btn btn-danger w-full" type="submit">Reject application</button></form>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
