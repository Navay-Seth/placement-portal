import { Link } from "react-router-dom";

function AdminDashboard() {
  return <div><div className="page-header"><div><h1>Admin dashboard</h1><p>Manage placement records across the portal.</p></div></div><section className="panel"><h2>Administration</h2><div className="quick-links"><Link to="/admin/students">Students</Link><Link to="/admin/recruiters">Recruiters</Link><Link to="/admin/companies">Companies</Link><Link to="/admin/jobs">Jobs</Link><Link to="/admin/applications">Applications</Link></div></section></div>;
}

export default AdminDashboard;
