import { Navigate } from "react-router-dom";
import AppShell from "./AppShell";

const loginRoutes = {
  student: "/login",
  recruiter: "/recruiter/login",
  admin: "/admin/login",
};

function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const loginRoute = loginRoutes[role] || "/login";

  if (!token || !role || !loginRoutes[role]) {
    return <Navigate to={loginRoute} replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={loginRoute} replace />;
  }

  return <AppShell>{children}</AppShell>;
}

export default ProtectedRoute;
