import AppShell from "./AppShell";

const validRoles = ["student", "recruiter", "admin"];

function ConditionalAppShell({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && validRoles.includes(role)) {
    return <AppShell>{children}</AppShell>;
  }

  return children;
}

export default ConditionalAppShell;
