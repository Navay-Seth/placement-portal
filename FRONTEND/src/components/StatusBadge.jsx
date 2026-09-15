const statusClass = (status) => {
  const value = String(status || "").toLowerCase();
  if (["selected", "accepted", "open"].includes(value)) return "success";
  if (value === "rejected") return "danger";
  if (["shortlisted", "offered", "applied"].includes(value)) return "info";
  return "neutral";
};

function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass(status)}`}>{status || "—"}</span>;
}

export default StatusBadge;
