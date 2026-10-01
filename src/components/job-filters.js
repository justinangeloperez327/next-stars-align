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
    <form className="panel grid gap-3 rounded-2xl p-4 md:grid-cols-[1.4fr_1fr_1fr_auto]" method="GET">
      <input className="field" defaultValue={values.search || ""} name="search" placeholder="Search jobs" />
      <input className="field" defaultValue={values.location || ""} name="location" placeholder="Location" />
      <select className="field" defaultValue={values.type || ""} name="type">
        {jobTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}
