import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import StatusBadge from "../components/StatusBadge";

function AdminApplications() {
  const [applications, setApplications] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { const load = async () => { try { const response = await api.get("/admin/applications"); setApplications(response.data.applications || []); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load applications."); } finally { setLoading(false); } }; load(); }, []);
  if (loading) return <LoadingState label="Loading applications..." />; if (error) return <p className="alert error" role="alert">{error}</p>;
  return <div><div className="page-header"><div><h1>Applications</h1><p>Applications submitted across the platform.</p></div></div>{applications.length === 0 ? <EmptyState title="No applications found" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Student</th><th>Job title</th><th>Company</th><th>Application date</th><th>Status</th></tr></thead><tbody>{applications.map((application) => <tr key={application.application_id}><td>{application.application_id}</td><td>{application.student_name}</td><td>{application.job_title}</td><td>{application.company_name}</td><td>{application.application_date ? new Date(application.application_date).toLocaleDateString() : "—"}</td><td><StatusBadge status={application.status} /></td></tr>)}</tbody></table></div>}</div>;
}
export default AdminApplications;
