import { useEffect, useState } from "react";
import api from "../services/api";

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
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Interviews</h1>

      {interviews.length === 0 ? (
        <p>No interviews scheduled yet.</p>
      ) : (
        interviews.map((interview) => (
          <div key={interview.interview_id}>
            <p>
              <strong>Interview Date:</strong>{" "}
              {interview.interview_date}
            </p>

            <p>
              <strong>Mode:</strong>{" "}
              {interview.interview_mode}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {interview.status}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Interviews;