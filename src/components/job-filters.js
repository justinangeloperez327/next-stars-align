const jobTypes = [
  ["", "All types"],
  ["full-time", "Full time"],
  ["part-time", "Part time"],
  ["contract", "Contract"],
  ["temporary", "Temporary"],
  ["internship", "Internship"],
];

export default function JobFilters({ values = {} }) {
  return (
    <form className="filter-bar glass-strong grid gap-3 rounded-[1.35rem] p-3 md:grid-cols-[1.5fr_1fr_1fr_auto]" method="GET">
      <label>
        <span className="sr-only">Search jobs</span>
        <input
          className="field"
          defaultValue={values.search || ""}
          name="search"
          placeholder="Role, skill, or keyword"
        />
      </label>
      <label>
        <span className="sr-only">Location</span>
        <input
          className="field"
          defaultValue={values.location || ""}
          name="location"
          placeholder="Location"
        />
      </label>
      <label>
        <span className="sr-only">Job type</span>
        <select className="field" defaultValue={values.type || ""} name="type">
          {jobTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <button className="btn btn-primary px-5" type="submit">Search jobs</button>
    </form>
  );
}
