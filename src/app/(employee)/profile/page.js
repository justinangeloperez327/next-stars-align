import {
  addEducationAction,
  addExperienceAction,
  deleteEducationAction,
  deleteExperienceAction,
  updateEducationAction,
  updateExperienceAction,
  updateProfileAction,
} from "@/app/actions";
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

  if (!profile) return null;

  return (
    <div className="shell py-14">
      <h1 className="text-3xl font-black">Profile</h1>
      <p className="muted mt-2">{profile.email}</p>

      <section className="panel mt-8 rounded-2xl p-6">
        <h2 className="text-xl font-bold">Personal information</h2>
        <form action={updateProfileAction} className="mt-5 grid gap-4 md:grid-cols-3">
          <input className="field" defaultValue={profile.firstName || ""} name="firstName" placeholder="First name" />
          <input className="field" defaultValue={profile.middleName || ""} name="middleName" placeholder="Middle name" />
          <input className="field" defaultValue={profile.lastName || ""} name="lastName" placeholder="Last name" />
          <div className="md:col-span-3"><button className="btn btn-primary" type="submit">Save profile</button></div>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Education</h2>
        <div className="mt-4 grid gap-4">
          {profile.education.map((item) => {
            const update = updateEducationAction.bind(null, item.id);
            const remove = deleteEducationAction.bind(null, item.id);
            return (
              <article className="panel rounded-2xl p-5" key={item.id}>
                <form action={update} className="grid gap-3 md:grid-cols-2">
                  <input className="field" defaultValue={item.school || ""} name="school" placeholder="School" required />
                  <input className="field" defaultValue={item.degree || ""} name="degree" placeholder="Degree" />
                  <DateField name="startDate" value={item.startDate} />
                  <DateField name="endDate" value={item.endDate} />
                  <button className="btn btn-secondary" type="submit">Update</button>
                </form>
                <form action={remove} className="mt-3">
                  <button className="btn btn-danger" type="submit">Remove</button>
                </form>
              </article>
            );
          })}
          <form action={addEducationAction} className="panel grid gap-3 rounded-2xl border-dashed p-5 md:grid-cols-2">
            <input className="field" name="school" placeholder="School" required />
            <input className="field" name="degree" placeholder="Degree" />
            <DateField name="startDate" />
            <DateField name="endDate" />
            <div className="md:col-span-2"><button className="btn btn-primary" type="submit">Add education</button></div>
          </form>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Experience</h2>
        <div className="mt-4 grid gap-4">
          {profile.experience.map((item) => {
            const update = updateExperienceAction.bind(null, item.id);
            const remove = deleteExperienceAction.bind(null, item.id);
            return (
              <article className="panel rounded-2xl p-5" key={item.id}>
                <form action={update} className="grid gap-3 md:grid-cols-2">
                  <input className="field" defaultValue={item.title || ""} name="title" placeholder="Job title" required />
                  <input className="field" defaultValue={item.company || ""} name="company" placeholder="Company" required />
                  <DateField name="startDate" value={item.startDate} />
                  <DateField name="endDate" value={item.endDate} />
                  <button className="btn btn-secondary" type="submit">Update</button>
                </form>
                <form action={remove} className="mt-3">
                  <button className="btn btn-danger" type="submit">Remove</button>
                </form>
              </article>
            );
          })}
          <form action={addExperienceAction} className="panel grid gap-3 rounded-2xl border-dashed p-5 md:grid-cols-2">
            <input className="field" name="title" placeholder="Job title" required />
            <input className="field" name="company" placeholder="Company" required />
            <DateField name="startDate" />
            <DateField name="endDate" />
            <div className="md:col-span-2"><button className="btn btn-primary" type="submit">Add experience</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}
