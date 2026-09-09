import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />


      {/* AUTHENTICATED */}

      <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />


        {/* CENTRAL OFFICER */}

        <Route element={<RoleRoute allowedRoles={["CENTRAL_OFFICER"]} />}>
          {/* Central-only routes later */}
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
          {/* Create/Edit project routes later */}
        </Route>


        {/* FIELD OFFICER */}

        <Route
          element={
            <RoleRoute
              allowedRoles={["FIELD_OFFICER"]}
            />
          }
        >
          {/* Field task routes later */}
        </Route>

      </Route>

    </Routes>
  );
}
