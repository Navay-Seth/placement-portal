import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.job_id}>
            <h2>{job.job_title}</h2>

            <p>Company: {job.company_name}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            <p>Job Type: {job.job_type}</p>
            <p>Deadline: {job.deadline}</p>
            <p>Status: {job.status}</p>

            <Link to={`/jobs/${job.job_id}`}>
              <button>View Details</button>
            </Link>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Jobs;