import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";  
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import Skills from "./pages/Skills";
import StudentDashboard from "./pages/StudentDashboard";
import Interviews from "./pages/Interviews";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/student/interviews"
          element={<Interviews />}
        />
        
        <Route
          path="/student/skills"
          element={<Skills />}
        />
        <Route
          path="/student/applications"
          element={<Applications />}
        />
        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/"
          element={<h1>College Placement & Recruitment Platform</h1>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<h1>Register Page</h1>}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;