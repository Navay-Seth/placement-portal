import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import LoadingState from "../components/LoadingState";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.job);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError("Unable to load job details.");
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      const response = await api.post("/students/applications", {
        job_id: Number(id),
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Failed to apply:", error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to submit application.");
      }
    }
  };

  if (error) {
    return <div className="page-content"><p className="alert error" role="alert">{error}</p></div>;
  }

  if (!job) {
    return <div className="page-content"><LoadingState label="Loading job details..." /></div>;
  }

  return (
    <div className="page-content"><article className="panel job-detail"><h1>{job.job_title}</h1><p className="company">{job.company_name}</p><div className="job-meta"><span>{job.location}</span><span>{job.salary}</span><span>{job.job_type}</span><span>Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}</span><StatusBadge status={job.status} /></div><h2>Description</h2><p className="job-description">{job.description}</p><button onClick={handleApply}>Apply for this job</button>{message && <p className="alert success">{message}</p>}</article>
    </div>
  );
}

export default JobDetails;
