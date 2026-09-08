import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Login - 4 Roles */}
      <Route path="/login" element={<Login />} />

      {/* Officer Portal */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;