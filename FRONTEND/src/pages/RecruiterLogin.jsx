import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleSwitcher from "../components/RoleSwitcher";

function RecruiterLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/recruiter/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "recruiter");
      navigate("/recruiter/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return <div><h1>Recruiter Login</h1>{error && <p role="alert">{error}</p>}<form onSubmit={handleSubmit}><div><label>Email</label><br /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div><br /><div><label>Password</label><br /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div><br /><button disabled={loading}>{loading ? "Logging in..." : "Login"}</button></form><p className="auth-links">New recruiter? <Link to="/recruiter/register">Register here</Link></p><RoleSwitcher activeRole="recruiter" mode="login" /></div>;
}

export default RecruiterLogin;
