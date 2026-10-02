import {
  addEducationAction,
  addExperienceAction,
  deleteEducationAction,
  deleteExperienceAction,
  updateEducationAction,
  updateExperienceAction,
  updateProfileAction,
} from "@/app/actions";
import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import { requireRole } from "@/lib/auth";
import { getEmployeeProfile } from "@/lib/data";

export const metadata = { title: "Profile" };

function dateValue(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function DateField({ name, value }) {
  return <input className="field" defaultValue={dateValue(value)} name={name} type="date" />;
}

export default async function ProfilePage() {
  const session = await requireRole("employee");
  const profile = await getEmployeeProfile(session.id);

  if (!profile) {
    return (
      <div className="shell py-14">
        <EmptyState title="Profile unavailable" description="Your professional profile is not available right now." />
      </div>
    );
  }

  const completed = [
    profile.firstName,
    profile.lastName,
    profile.education.length,
    profile.experience.length,
    profile.skills.length,
  ].filter(Boolean).length;
  const completion = Math.round((completed / 5) * 100);
  const fullName = [profile.firstName, profile.middleName, profile.lastName].filter(Boolean).join(" ") || "Your profile";

  return (
    <div className="shell py-14 sm:py-20">
      <PageHeader
        eyebrow="Professional profile"
        title={fullName}
        description={profile.email}
      />

      <section className="profile-overview panel mt-7">
        <div>
          <p className="info-label">Profile completion</p>
          <p className="mt-2 text-3xl font-black">{completion}%</p>
        </div>
        <div className="completion-track">
          <div className="completion-fill" style={{ width: completion + "%" }} />
        </div>
      </section>

      <section className="surface mt-8 rounded-[1.4rem] p-5 sm:p-7">
        <div className="section-heading">
          <div>
            <p className="info-label">Personal information</p>
            <h2 className="mt-2 text-xl font-extrabold">Basic details</h2>
          </div>
        </div>
        <form action={updateProfileAction} className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2"><span className="form-label">First name</span><input className="field" defaultValue={profile.firstName || ""} name="firstName" /></label>
          <label className="grid gap-2"><span className="form-label">Middle name</span><input className="field" defaultValue={profile.middleName || ""} name="middleName" /></label>
          <label className="grid gap-2"><span className="form-label">Last name</span><input className="field" defaultValue={profile.lastName || ""} name="lastName" /></label>
          <div className="md:col-span-3 flex justify-end"><button className="btn btn-primary" type="submit">Save profile</button></div>
        </form>
      </section>

      {profile.skills.length > 0 && (
        <section className="mt-10">
          <p className="info-label">Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">{profile.skills.map((skill) => <span className="meta-chip" key={skill}>{skill}</span>)}</div>
        </section>
      )}

      <section className="mt-10">
        <p className="info-label">Experience</p>
        <h2 className="mt-2 text-2xl font-extrabold">Work history</h2>
        <div className="mt-4 grid gap-4">
          {profile.experience.map((item) => {
            const update = updateExperienceAction.bind(null, item.id);
            const remove = deleteExperienceAction.bind(null, item.id);
            return (
              <article className="panel rounded-[1.3rem] p-5" key={item.id}>
                <form action={update} className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-2"><span className="form-label">Job title</span><input className="field" defaultValue={item.title || ""} name="title" required /></label>
                  <label className="grid gap-2"><span className="form-label">Company</span><input className="field" defaultValue={item.company || ""} name="company" required /></label>
                  <DateField name="startDate" value={item.startDate} />
                  <DateField name="endDate" value={item.endDate} />
                  <div className="flex flex-wrap gap-2 md:col-span-2">
                    <button className="btn btn-secondary" type="submit">Update</button>
                  </div>
                </form>
                <form action={remove} className="mt-3"><button className="text-sm font-bold text-red-300" type="submit">Remove experience</button></form>
              </article>
            );
          })}
          <form action={addExperienceAction} className="surface grid gap-3 rounded-[1.3rem] border-dashed p-5 md:grid-cols-2">
            <input className="field" name="title" placeholder="Job title" required />
            <input className="field" name="company" placeholder="Company" required />
            <DateField name="startDate" />
            <DateField name="endDate" />
            <div className="md:col-span-2"><button className="btn btn-primary" type="submit">Add experience</button></div>
          </form>
        </div>
      </section>

      <section className="mt-10">
        <p className="info-label">Education</p>
        <h2 className="mt-2 text-2xl font-extrabold">Academic background</h2>
        <div className="mt-4 grid gap-4">
          {profile.education.map((item) => {
            const update = updateEducationAction.bind(null, item.id);
            const remove = deleteEducationAction.bind(null, item.id);
            return (
              <article className="panel rounded-[1.3rem] p-5" key={item.id}>
                <form action={update} className="grid gap-3 md:grid-cols-2">
                  <input className="field" defaultValue={item.school || ""} name="school" placeholder="School" required />
                  <input className="field" defaultValue={item.degree || ""} name="degree" placeholder="Degree" />
                  <DateField name="startDate" value={item.startDate} />
                  <DateField name="endDate" value={item.endDate} />
                  <button className="btn btn-secondary" type="submit">Update</button>
                </form>
                <form action={remove} className="mt-3"><button className="text-sm font-bold text-red-300" type="submit">Remove education</button></form>
              </article>
            );
          })}
          <form action={addEducationAction} className="surface grid gap-3 rounded-[1.3rem] border-dashed p-5 md:grid-cols-2">
            <input className="field" name="school" placeholder="School" required />
            <input className="field" name="degree" placeholder="Degree" />
            <DateField name="startDate" />
            <DateField name="endDate" />
            <div className="md:col-span-2"><button className="btn btn-primary" type="submit">Add education</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}
