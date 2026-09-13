import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
    return <h2>{error}</h2>;
  }

  if (!job) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{job.job_title}</h1>

      <h2>{job.company_name}</h2>

      <p>Description: {job.description}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Job Type: {job.job_type}</p>
      <p>Deadline: {job.deadline}</p>
      <p>Status: {job.status}</p>

      <br />

      <button onClick={handleApply}>
        Apply for this Job
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default JobDetails;