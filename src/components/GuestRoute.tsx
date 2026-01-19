import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../utils/network-data";

const GuestRoute = ({ user }: { user: User | null }) => {
  const location = useLocation();

  if (user) {
    const from =
      typeof location.state?.from === "string" ? location.state.from : "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
