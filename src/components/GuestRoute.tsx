import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../utils/network-data";

const GuestRoute = ({ user }: { user: User | null }) => {
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
