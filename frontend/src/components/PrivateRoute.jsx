import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  // 🔥 FIX: fallback handling
  const isAdmin =
    localStorage.getItem("isAdmin") === "true" ||
    localStorage.getItem("isAdmin") === true;

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // ❌ Not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin access
  return children;
};

export default PrivateRoute;