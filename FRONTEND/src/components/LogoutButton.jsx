import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const role = localStorage.getItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    if (role === "recruiter") {
      navigate("/recruiter/login");
    } else if (role === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
