import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import ProjectCreate from "./pages/ProjectCreate";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* AUTHENTICATED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/new" element={<ProjectCreate />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />

        {/* CENTRAL OFFICER ONLY */}
        <Route
          element={
            <RoleRoute
              allowedRoles={["CENTRAL_OFFICER"]}
            />
          }
        >
          {/* Central-only pages later */}
        </Route>

        {/* CENTRAL + STATE */}
        <Route
          element={
            <RoleRoute
              allowedRoles={[
                "CENTRAL_OFFICER",
                "STATE_OFFICER",
              ]}
            />
          }
        >
          {/* State management pages later */}
        </Route>

        {/* FIELD OFFICER */}
        <Route
          element={
            <RoleRoute
              allowedRoles={["FIELD_OFFICER"]}
            />
          }
        >
          {/* Field pages later */}
        </Route>
      </Route>
    </Routes>
  );
}