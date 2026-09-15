import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleSwitcher from "../components/RoleSwitcher";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/admin/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return <div><h1>Admin Login</h1>{error && <p role="alert">{error}</p>}<form onSubmit={submit}><div><label>Email</label><br /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><br /><div><label>Password</label><br /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><br /><button disabled={loading}>{loading ? "Logging in..." : "Login"}</button></form><p className="auth-links">New admin? <Link to="/admin/register">Register here</Link></p><RoleSwitcher activeRole="admin" mode="login" /></div>;
}

export default AdminLogin;
