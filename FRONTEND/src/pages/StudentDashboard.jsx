import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingState from "../components/LoadingState";

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
    return <p className="alert error" role="alert">{error}</p>;
  }

  if (!student) {
    return <LoadingState label="Loading your profile..." />;
  }

  return (
    <div>
      <div className="page-header"><div><h1>Dashboard</h1><p>Welcome back, {student.name}.</p></div></div>
      <section className="panel"><h2>Profile summary</h2><div className="profile-grid"><div className="profile-item"><span>Email</span><strong>{student.email}</strong></div><div className="profile-item"><span>Phone</span><strong>{student.phone || "—"}</strong></div><div className="profile-item"><span>CGPA</span><strong>{student.cgpa}</strong></div><div className="profile-item"><span>Graduation year</span><strong>{student.graduation_year}</strong></div></div></section>
      <section className="panel"><h2>Quick access</h2><div className="quick-links"><Link to="/jobs">Browse jobs</Link><Link to="/student/applications">My applications</Link><Link to="/student/skills">My skills</Link><Link to="/student/interviews">My interviews</Link><Link to="/student/offers">My offers</Link></div></section>
    </div>
  );
}

export default StudentDashboard;
