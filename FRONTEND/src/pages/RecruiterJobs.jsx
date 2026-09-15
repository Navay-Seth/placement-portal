import { useEffect, useState } from "react";
import api from "../services/api";

const emptyJob = { job_title: "", description: "", location: "", salary: "", job_type: "", deadline: "", status: "Open" };
const errorMessage = (error, fallback) => error.response?.data?.message || fallback;

function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loadJobs = async () => { setLoading(true); try { const response = await api.get("/recruiter/jobs"); setJobs(response.data.jobs || []); } catch (requestError) { setError(errorMessage(requestError, "Unable to load jobs.")); } finally { setLoading(false); } };
  useEffect(() => { loadJobs(); }, []);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setError(""); setMessage("");
    try {
      const payload = { ...form, salary: Number(form.salary) };
      const response = editingId ? await api.put(`/recruiter/jobs/${editingId}`, payload) : await api.post("/recruiter/jobs", payload);
      setMessage(response.data.message || "Job saved successfully."); setForm(emptyJob); setEditingId(null); await loadJobs();
    } catch (requestError) { setError(errorMessage(requestError, "Unable to save the job.")); }
  };
  const edit = (job) => { setForm({ job_title: job.job_title || "", description: job.description || "", location: job.location || "", salary: job.salary || "", job_type: job.job_type || "", deadline: job.deadline ? String(job.deadline).slice(0, 10) : "", status: job.status || "Open" }); setEditingId(job.job_id); setMessage(""); setError(""); };
  const remove = async (id) => { if (!window.confirm("Delete this job?")) return; setError(""); try { const response = await api.delete(`/recruiter/jobs/${id}`); setMessage(response.data.message || "Job deleted successfully."); await loadJobs(); } catch (requestError) { setError(errorMessage(requestError, "Unable to delete job.")); } };
  return <div><h1>Manage Jobs</h1>{message && <p>{message}</p>}{error && <p role="alert">{error}</p>}<h2>{editingId ? "Edit Job" : "Create Job"}</h2><form onSubmit={submit}><input name="job_title" placeholder="Job title" value={form.job_title} onChange={update} required /><br /><textarea name="description" placeholder="Description" value={form.description} onChange={update} required /><br /><input name="location" placeholder="Location" value={form.location} onChange={update} required /><br /><input name="salary" type="number" min="0" placeholder="Salary" value={form.salary} onChange={update} required /><br /><input name="job_type" placeholder="Job type" value={form.job_type} onChange={update} required /><br /><label>Deadline <input name="deadline" type="date" value={form.deadline} onChange={update} required /></label><br />{editingId && <label>Status <input name="status" value={form.status} onChange={update} required /></label>}<br /><button>{editingId ? "Update Job" : "Create Job"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyJob); }}>Cancel</button>}</form><h2>Your Jobs</h2>{loading ? <p>Loading jobs...</p> : jobs.length === 0 ? <p>No jobs created yet.</p> : jobs.map((job) => <div key={job.job_id}><h3>{job.job_title}</h3><p>{job.description}</p><p>Location: {job.location} | Salary: {job.salary} | Type: {job.job_type}</p><p>Deadline: {job.deadline ? String(job.deadline).slice(0, 10) : "—"} | Status: {job.status}</p><button onClick={() => edit(job)}>Edit</button> <button onClick={() => remove(job.job_id)}>Delete</button><hr /></div>)}</div>;
}
export default RecruiterJobs;
