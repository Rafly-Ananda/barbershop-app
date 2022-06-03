import { FC } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const location = useLocation();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
