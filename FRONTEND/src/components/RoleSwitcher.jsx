import { Link } from "react-router-dom";

const roleRoutes = {
  login: { student: "/login", recruiter: "/recruiter/login", admin: "/admin/login" },
  register: { student: "/register", recruiter: "/recruiter/register", admin: "/admin/register" },
};

function RoleSwitcher({ activeRole, mode }) {
  const label = mode === "login" ? "Login as" : "Register as";

  return <div className="role-switcher" aria-label={label}><span>{label}</span><div className="role-switcher-links">{Object.entries(roleRoutes[mode]).map(([role, path]) => <Link key={role} to={path} className={role === activeRole ? "active" : ""} aria-current={role === activeRole ? "page" : undefined}>{role.charAt(0).toUpperCase() + role.slice(1)}</Link>)}</div></div>;
}

export default RoleSwitcher;
