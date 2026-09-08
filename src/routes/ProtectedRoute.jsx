import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Session check
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />

          <p className="text-sm text-slate-600">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  // User logged in nahi hai
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // User authenticated hai
  return <Outlet />;
}

export default ProtectedRoute;