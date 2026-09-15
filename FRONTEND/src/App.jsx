import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import Skills from "./pages/Skills";
import Interviews from "./pages/Interviews";
import Offers from "./pages/Offers";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterRegister from "./pages/RecruiterRegister";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterJobs from "./pages/RecruiterJobs";
import RecruiterApplications from "./pages/RecruiterApplications";
import RecruiterInterviews from "./pages/RecruiterInterviews";
import RecruiterOffers from "./pages/RecruiterOffers";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminRecruiters from "./pages/AdminRecruiters";
import AdminCompanies from "./pages/AdminCompanies";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import ConditionalAppShell from "./components/ConditionalAppShell";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<AuthLayout><Login /></AuthLayout>}
        />

        <Route
          path="/register"
          element={<AuthLayout><Register /></AuthLayout>}
        />

        <Route
          path="/student/dashboard"
          element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>}
        />

        <Route
          path="/jobs"
          element={<ConditionalAppShell><Jobs /></ConditionalAppShell>}
        />

        <Route
          path="/jobs/:id"
          element={<ConditionalAppShell><JobDetails /></ConditionalAppShell>}
        />

        <Route
          path="/student/applications"
          element={<ProtectedRoute allowedRole="student"><Applications /></ProtectedRoute>}
        />

        <Route
          path="/student/skills"
          element={<ProtectedRoute allowedRole="student"><Skills /></ProtectedRoute>}
        />

        <Route
          path="/student/interviews"
          element={<ProtectedRoute allowedRole="student"><Interviews /></ProtectedRoute>}
        />

        <Route
          path="/student/offers"
          element={<ProtectedRoute allowedRole="student"><Offers /></ProtectedRoute>}
        />

        <Route path="/recruiter/login" element={<AuthLayout><RecruiterLogin /></AuthLayout>} />
        <Route path="/recruiter/register" element={<AuthLayout><RecruiterRegister /></AuthLayout>} />
        <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRole="recruiter"><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/recruiter/jobs" element={<ProtectedRoute allowedRole="recruiter"><RecruiterJobs /></ProtectedRoute>} />
        <Route path="/recruiter/applications" element={<ProtectedRoute allowedRole="recruiter"><RecruiterApplications /></ProtectedRoute>} />
        <Route path="/recruiter/interviews" element={<ProtectedRoute allowedRole="recruiter"><RecruiterInterviews /></ProtectedRoute>} />
        <Route path="/recruiter/offers" element={<ProtectedRoute allowedRole="recruiter"><RecruiterOffers /></ProtectedRoute>} />

        <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />
        <Route path="/admin/register" element={<AuthLayout><AdminRegister /></AuthLayout>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute allowedRole="admin"><AdminStudents /></ProtectedRoute>} />
        <Route path="/admin/recruiters" element={<ProtectedRoute allowedRole="admin"><AdminRecruiters /></ProtectedRoute>} />
        <Route path="/admin/companies" element={<ProtectedRoute allowedRole="admin"><AdminCompanies /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute allowedRole="admin"><AdminJobs /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute allowedRole="admin"><AdminApplications /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
