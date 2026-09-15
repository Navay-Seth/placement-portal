import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function AdminCompanies() {
  const [companies, setCompanies] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { const load = async () => { try { const response = await api.get("/admin/companies"); setCompanies(response.data.companies || []); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load companies."); } finally { setLoading(false); } }; load(); }, []);
  if (loading) return <LoadingState label="Loading companies..." />; if (error) return <p className="alert error" role="alert">{error}</p>;
  return <div><div className="page-header"><div><h1>Companies</h1><p>Companies participating in campus placement.</p></div></div>{companies.length === 0 ? <EmptyState title="No companies found" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Company</th><th>Email</th><th>Website</th></tr></thead><tbody>{companies.map((company) => <tr key={company.company_id}><td>{company.company_id}</td><td>{company.company_name}</td><td>{company.email}</td><td>{company.website}</td></tr>)}</tbody></table></div>}</div>;
}
export default AdminCompanies;
