import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function AdminRecruiters() {
  const [recruiters, setRecruiters] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { const load = async () => { try { const response = await api.get("/admin/recruiters"); setRecruiters(response.data.recruiters || []); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load recruiters."); } finally { setLoading(false); } }; load(); }, []);
  if (loading) return <LoadingState label="Loading recruiters..." />; if (error) return <p className="alert error" role="alert">{error}</p>;
  return <div><div className="page-header"><div><h1>Recruiters</h1><p>Recruiter accounts and their companies.</p></div></div>{recruiters.length === 0 ? <EmptyState title="No recruiters found" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Company</th></tr></thead><tbody>{recruiters.map((recruiter) => <tr key={recruiter.recruiter_id}><td>{recruiter.recruiter_id}</td><td>{recruiter.name}</td><td>{recruiter.email}</td><td>{recruiter.company_name}</td></tr>)}</tbody></table></div>}</div>;
}
export default AdminRecruiters;
