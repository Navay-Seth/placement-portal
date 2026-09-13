import { useEffect, useState } from "react";
import api from "../services/api";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/students/profile");
        setStudent(response.data.student);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Unable to load student profile.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Student Dashboard</h1>

      <h2>Welcome, {student.name}</h2>

      <p>Email: {student.email}</p>
      <p>Phone: {student.phone}</p>
      <p>CGPA: {student.cgpa}</p>
      <p>Graduation Year: {student.graduation_year}</p>

      <hr />

      <button>Browse Jobs</button>
      <button>My Applications</button>
      <button>My Skills</button>
      <button>My Interviews</button>
      <button>My Offers</button>
    </div>
  );
}

export default StudentDashboard;