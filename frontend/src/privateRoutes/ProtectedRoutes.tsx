import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

const protectedRoutes = ({ children }: { children: ReactNode }) => {
  const userToken = localStorage.getItem("auth-token");
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default protectedRoutes;
