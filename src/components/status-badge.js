const labels = {
  submitted: "Submitted",
  reviewed: "Reviewed",
  accepted: "Accepted",
  rejected: "Rejected",
  active: "Active",
  closed: "Closed",
  draft: "Draft",
  employee: "Candidate",
  employer: "Employer",
  admin: "Admin",
};

export default function StatusBadge({ status }) {
  const value = String(status || "unknown").toLowerCase();

  return (
    <span className={"status-badge status-" + value}>
      <span className="status-dot" aria-hidden="true" />
      {labels[value] || status}
    </span>
  );
}
