import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleSwitcher from "../components/RoleSwitcher";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/student/register", {
        name,
        email,
        password,
        phone,
        department_id: Number(departmentId),
        cgpa: Number(cgpa),
        graduation_year: Number(graduationYear),
      });

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed.");
      }
    }
  };

  return (
    <div>
      <h1>Student Registration</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Department ID</label>
          <br />
          <input
            type="number"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>CGPA</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Graduation Year</label>
          <br />
          <input
            type="number"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
      <p className="auth-links">Already registered? <Link to="/login">Log in</Link></p>
      <RoleSwitcher activeRole="student" mode="register" />
    </div>
  );
}

export default Register;
