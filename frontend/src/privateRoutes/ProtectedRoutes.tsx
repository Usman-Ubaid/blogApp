import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
  children?: React.ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const userToken = localStorage.getItem("auth-token");
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
