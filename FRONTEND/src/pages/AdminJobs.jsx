import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import StatusBadge from "../components/StatusBadge";

function AdminJobs() {
  const [jobs, setJobs] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { const load = async () => { try { const response = await api.get("/admin/jobs"); setJobs(response.data.jobs || []); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load jobs."); } finally { setLoading(false); } }; load(); }, []);
  if (loading) return <LoadingState label="Loading jobs..." />; if (error) return <p className="alert error" role="alert">{error}</p>;
  return <div><div className="page-header"><div><h1>Jobs</h1><p>Jobs posted across all participating companies.</p></div></div>{jobs.length === 0 ? <EmptyState title="No jobs found" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Job title</th><th>Company</th><th>Recruiter</th><th>Location</th><th>Salary</th><th>Job type</th><th>Deadline</th><th>Status</th></tr></thead><tbody>{jobs.map((job) => <tr key={job.job_id}><td>{job.job_id}</td><td>{job.job_title}</td><td>{job.company_name}</td><td>{job.recruiter_name}</td><td>{job.location}</td><td>{job.salary}</td><td>{job.job_type}</td><td>{job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}</td><td><StatusBadge status={job.status} /></td></tr>)}</tbody></table></div>}</div>;
}
export default AdminJobs;
