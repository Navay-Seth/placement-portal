import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleSwitcher from "../components/RoleSwitcher";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/student/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "student");

      alert("Login successful!");

      navigate("/student/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div>
      <h1>Student Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
      <p className="auth-links">New student? <Link to="/register">Register here</Link></p>
      <RoleSwitcher activeRole="student" mode="login" />
    </div>
  );
}

export default Login;
