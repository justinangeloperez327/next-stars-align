const jobTypes = ["full-time", "part-time", "contract", "temporary", "internship"];

export default function JobForm({ action, job = {}, submitLabel = "Save job" }) {
  return (
    <form action={action} className="panel grid gap-5 rounded-2xl p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold">Title</span>
          <input className="field" defaultValue={job.title || ""} name="title" required />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Location</span>
          <input className="field" defaultValue={job.location || ""} name="location" required />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Type</span>
          <select className="field" defaultValue={job.type || "full-time"} name="type">
            {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Salary</span>
          <input className="field" defaultValue={job.salary || ""} name="salary" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Experience (years)</span>
          <input className="field" defaultValue={job.experience ?? 0} min="0" name="experience" type="number" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Education</span>
          <input className="field" defaultValue={job.education || ""} name="education" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-bold">Deadline</span>
          <input className="field" defaultValue={job.deadline?.slice?.(0, 10) || job.deadline || ""} name="deadline" required type="date" />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-bold">Description</span>
        <textarea className="field min-h-32" defaultValue={job.description || ""} name="description" required />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-bold">Requirements</span>
        <textarea className="field min-h-28" defaultValue={job.requirements || ""} name="requirements" required />
      </label>
      <div>
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
