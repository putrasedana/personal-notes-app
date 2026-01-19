import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../utils/network-data";

const ProtectedRoute = ({ user }: { user: User | null }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
