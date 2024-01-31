import { Navigate, Outlet } from "react-router-dom";
import { getStorageToken } from "../utils/tokenStorage";

type ProtectedRoutesProps = {
  children?: React.ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const userToken = getStorageToken();
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
