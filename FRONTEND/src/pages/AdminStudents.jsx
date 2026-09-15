import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function AdminStudents() {
  const [students, setStudents] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { const load = async () => { try { const response = await api.get("/admin/students"); setStudents(response.data.students || []); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load students."); } finally { setLoading(false); } }; load(); }, []);
  if (loading) return <LoadingState label="Loading students..." />; if (error) return <p className="alert error" role="alert">{error}</p>;
  return <div><div className="page-header"><div><h1>Students</h1><p>Student records across the placement portal.</p></div></div>{students.length === 0 ? <EmptyState title="No students found" /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Department</th><th>CGPA</th><th>Graduation year</th></tr></thead><tbody>{students.map((student) => <tr key={student.student_id}><td>{student.student_id}</td><td>{student.name}</td><td>{student.email}</td><td>{student.phone}</td><td>{student.department_name}</td><td>{student.cgpa}</td><td>{student.graduation_year}</td></tr>)}</tbody></table></div>}</div>;
}
export default AdminStudents;
