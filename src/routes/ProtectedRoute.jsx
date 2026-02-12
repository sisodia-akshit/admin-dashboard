import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/ui/Loading";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Loading fullScreen={isLoading} />
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
