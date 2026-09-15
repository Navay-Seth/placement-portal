import { useEffect, useState } from "react";
import api from "../services/api";
const statuses = ["Applied", "Shortlisted", "Rejected", "Selected"];

function RecruiterApplications() {
  const [jobs, setJobs] = useState([]); const [jobId, setJobId] = useState(""); const [applications, setApplications] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => { (async () => { try { const response = await api.get("/recruiter/jobs"); setJobs(response.data.jobs || []); } catch (e) { setError(e.response?.data?.message || "Unable to load jobs."); } finally { setLoading(false); } })(); }, []);
  const loadApplications = async (id) => { if (!id) { setApplications([]); return; } setError(""); try { const response = await api.get(`/recruiter/jobs/${id}/applications`); setApplications(response.data.applications || []); } catch (e) { setError(e.response?.data?.message || "Unable to load applications."); } };
  const chooseJob = (event) => { const id = event.target.value; setJobId(id); setMessage(""); loadApplications(id); };
  const updateStatus = async (applicationId, status) => { setError(""); try { const response = await api.put(`/recruiter/applications/${applicationId}`, { status }); setMessage(response.data.message || "Application updated successfully."); await loadApplications(jobId); } catch (e) { setError(e.response?.data?.message || "Unable to update application."); } };
  return <div><h1>Applications</h1>{message && <p>{message}</p>}{error && <p role="alert">{error}</p>}<label>Select a job <select value={jobId} onChange={chooseJob} disabled={loading}><option value="">Select a job</option>{jobs.map((job) => <option key={job.job_id} value={job.job_id}>{job.job_title}</option>)}</select></label>{loading ? <p>Loading jobs...</p> : jobId && (applications.length === 0 ? <p>No applications for this job.</p> : applications.map((application) => <div key={application.application_id}><h3>{application.student_name}</h3><p>Email: {application.student_email} | CGPA: {application.cgpa}</p><p>Applied: {application.application_date ? String(application.application_date).slice(0, 10) : "—"}</p><label>Status <select value={application.status} onChange={(e) => updateStatus(application.application_id, e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label><hr /></div>))}</div>;
}
export default RecruiterApplications;
