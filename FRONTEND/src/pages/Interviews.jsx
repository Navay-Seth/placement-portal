import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await api.get("/students/interviews");
        setInterviews(response.data.interviews);
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
        setError("Unable to load interviews.");
      }
    };

    fetchInterviews();
  }, []);

  if (error) {
    return <p className="alert error" role="alert">{error}</p>;
  }

  return (
    <div><div className="page-header"><div><h1>My interviews</h1><p>Your scheduled interview details.</p></div></div>

      {interviews.length === 0 ? (
        <EmptyState title="No interviews scheduled" description="Interview details will appear here when they are scheduled." />
      ) : (
        <div className="table-wrap"><table><thead><tr><th>Interview date</th><th>Mode</th><th>Status</th></tr></thead><tbody>{interviews.map((interview) => <tr key={interview.interview_id}><td>{interview.interview_date ? new Date(interview.interview_date).toLocaleString() : "—"}</td><td>{interview.interview_mode}</td><td><StatusBadge status={interview.status} /></td></tr>)}</tbody></table></div>
      )}
    </div>
  );
}

export default Interviews;
