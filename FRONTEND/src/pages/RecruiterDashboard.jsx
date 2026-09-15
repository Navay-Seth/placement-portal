import { Link } from "react-router-dom";

function RecruiterDashboard() {
  return <div><div className="page-header"><div><h1>Recruiter dashboard</h1><p>Manage your placement activities.</p></div></div><section className="panel"><h2>Quick access</h2><div className="quick-links"><Link to="/recruiter/jobs">Manage jobs</Link><Link to="/recruiter/applications">Applications</Link><Link to="/recruiter/interviews">Interviews</Link><Link to="/recruiter/offers">Offers</Link></div></section></div>;
}
export default RecruiterDashboard;
