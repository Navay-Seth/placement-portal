import { useEffect, useState } from "react";
import api from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/students/applications");
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        setError("Unable to load applications.");
      }
    };

    fetchApplications();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        applications.map((application) => (
          <div key={application.application_id}>
            <h2>{application.job_title}</h2>

            <p>Company: {application.company_name}</p>
            <p>Application Date: {application.application_date}</p>
            <p>Status: {application.status}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;