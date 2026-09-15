import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

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
    return <p className="alert error" role="alert">{error}</p>;
  }

  return (
    <div><div className="page-header"><div><h1>My applications</h1><p>Track the jobs you have applied for.</p></div></div>

      {applications.length === 0 ? (
        <EmptyState title="No applications yet" description="Jobs you apply for will appear here." />
      ) : (
        <div className="table-wrap"><table><thead><tr><th>Job</th><th>Company</th><th>Application date</th><th>Status</th></tr></thead><tbody>{applications.map((application) => <tr key={application.application_id}><td>{application.job_title}</td><td>{application.company_name}</td><td>{application.application_date ? new Date(application.application_date).toLocaleDateString() : "—"}</td><td><StatusBadge status={application.status} /></td></tr>)}</tbody></table></div>
      )}
    </div>
  );
}

export default Applications;
