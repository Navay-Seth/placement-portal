import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const navigation = {
  student: [["Dashboard", "/student/dashboard"], ["Jobs", "/jobs"], ["Applications", "/student/applications"], ["Skills", "/student/skills"], ["Interviews", "/student/interviews"], ["Offers", "/student/offers"]],
  recruiter: [["Dashboard", "/recruiter/dashboard"], ["Jobs", "/recruiter/jobs"], ["Applications", "/recruiter/applications"], ["Interviews", "/recruiter/interviews"], ["Offers", "/recruiter/offers"]],
  admin: [["Dashboard", "/admin/dashboard"], ["Students", "/admin/students"], ["Recruiters", "/admin/recruiters"], ["Companies", "/admin/companies"], ["Jobs", "/admin/jobs"], ["Applications", "/admin/applications"]],
};

const titles = { dashboard: "Dashboard", applications: "Applications", skills: "Skills", interviews: "Interviews", offers: "Offers", jobs: "Jobs", students: "Students", recruiters: "Recruiters", companies: "Companies" };

function AppShell({ children }) {
  const role = localStorage.getItem("role");
  const { pathname } = useLocation();
  const title = titles[pathname.split("/").filter(Boolean).pop()] || "Placement Portal";

  return <div className="app-shell"><aside className="sidebar"><NavLink className="brand" to={role === "student" ? "/student/dashboard" : `/${role}/dashboard`}><span className="brand-mark">P</span><span>Placement Portal</span></NavLink><p className="sidebar-role">{role}</p><nav className="sidebar-nav">{navigation[role]?.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>{label}</NavLink>)}</nav><div className="sidebar-footer"><LogoutButton /></div></aside><section className="app-content"><header className="topbar"><h1>{title}</h1><span className="role-context">{role} portal</span></header><main className="page-content">{children}</main></section></div>;
}

export default AppShell;
