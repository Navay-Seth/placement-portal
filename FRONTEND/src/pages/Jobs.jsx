import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        console.log("JOBS RESPONSE:", response.data);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError("Unable to load jobs.");
      }
    };

    fetchJobs();
  }, []);

  if (error) {
    return <div className="page-content"><p className="alert error" role="alert">{error}</p></div>;
  }

  return (
    <div className="page-content"><div className="page-header"><div><h1>Jobs</h1><p>Explore current placement opportunities.</p></div></div>

      {jobs.length === 0 ? (
        <EmptyState title="No jobs available" description="New opportunities will appear here when they are posted." />
      ) : (
        <div className="job-list">{jobs.map((job) => <article className="job-row" key={job.job_id}><h2>{job.job_title}</h2><p>{job.company_name}</p><div className="job-meta"><span>{job.location}</span><span>{job.job_type}</span><span>{job.salary}</span><span>Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}</span><StatusBadge status={job.status} /></div><Link to={`/jobs/${job.job_id}`}><button className="button-secondary">View details</button></Link></article>)}</div>
      )}
    </div>
  );
}

export default Jobs;
