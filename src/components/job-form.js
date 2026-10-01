const jobTypes = ["full-time", "part-time", "contract", "temporary", "internship"];

export default function JobForm({ action, job = {}, submitLabel = "Save job" }) {
  return (
    <form action={action} className="surface grid gap-6 rounded-[1.4rem] p-5 sm:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="form-label">Title</span>
          <input className="field" defaultValue={job.title || ""} name="title" required />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Location</span>
          <input className="field" defaultValue={job.location || ""} name="location" required />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Type</span>
          <select className="field" defaultValue={job.type || "full-time"} name="type">
            {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="form-label">Salary</span>
          <input className="field" defaultValue={job.salary || ""} name="salary" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Experience (years)</span>
          <input className="field" defaultValue={job.experience ?? 0} min="0" name="experience" type="number" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Education</span>
          <input className="field" defaultValue={job.education || ""} name="education" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="form-label">Deadline</span>
          <input className="field" defaultValue={job.deadline?.slice?.(0, 10) || job.deadline || ""} name="deadline" required type="date" />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="form-label">Description</span>
        <textarea className="field min-h-36 resize-y" defaultValue={job.description || ""} name="description" required />
      </label>
      <label className="grid gap-2">
        <span className="form-label">Requirements</span>
        <textarea className="field min-h-32 resize-y" defaultValue={job.requirements || ""} name="requirements" required />
      </label>
      <div className="flex justify-end border-t border-white/8 pt-5">
        <button className="btn btn-primary min-w-36" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
