import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleSwitcher from "../components/RoleSwitcher";

function RecruiterRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "", company_id: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setError(""); setMessage(""); setLoading(true);
    try {
      const response = await api.post("/auth/recruiter/register", { ...form, company_id: Number(form.company_id) });
      setMessage(response.data.message || "Recruiter registered successfully.");
      setTimeout(() => navigate("/recruiter/login"), 800);
    } catch (requestError) { setError(requestError.response?.data?.message || "Registration failed."); } finally { setLoading(false); }
  };
  return <div><h1>Recruiter Registration</h1>{message && <p>{message}</p>}{error && <p role="alert">{error}</p>}<form onSubmit={submit}><div><label>Name</label><br /><input name="name" value={form.name} onChange={update} required /></div><br /><div><label>Email</label><br /><input name="email" type="email" value={form.email} onChange={update} required /></div><br /><div><label>Password</label><br /><input name="password" type="password" value={form.password} onChange={update} required /></div><br /><div><label>Company ID</label><br /><input name="company_id" type="number" min="1" value={form.company_id} onChange={update} required /></div><br /><button disabled={loading}>{loading ? "Registering..." : "Register"}</button></form><p className="auth-links">Already registered? <Link to="/recruiter/login">Log in</Link></p><RoleSwitcher activeRole="recruiter" mode="register" /></div>;
}
export default RecruiterRegister;
