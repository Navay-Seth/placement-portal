import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleSwitcher from "../components/RoleSwitcher";

function AdminRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/auth/admin/register", form);
      setMessage(response.data.message || "Admin registered successfully.");
      setTimeout(() => navigate("/admin/login"), 800);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Admin registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return <div><h1>Admin Registration</h1>{message && <p>{message}</p>}{error && <p role="alert">{error}</p>}<form onSubmit={submit}><div><label>Name</label><br /><input name="name" value={form.name} onChange={update} required /></div><br /><div><label>Email</label><br /><input name="email" type="email" value={form.email} onChange={update} required /></div><br /><div><label>Password</label><br /><input name="password" type="password" value={form.password} onChange={update} required /></div><br /><button disabled={loading}>{loading ? "Registering..." : "Register"}</button></form><p className="auth-links">Already registered? <Link to="/admin/login">Log in</Link></p><RoleSwitcher activeRole="admin" mode="register" /></div>;
}

export default AdminRegister;
