import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "../privateRoutes/ProtectedRoutes";
import WriteBlog from "../pages/WriteBlog";
import Dashboard from "../pages/Dashboard";
import Blogs from "../pages/Blogs";

const Routers = () => {
  const routes = [
    {
      id: 1,
      path: "/login",
      element: <Login />,
    },
    {
      id: 2,
      path: "/register",
      element: <Register />,
    },
  ];
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/writeBlog" element={<WriteBlog />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/blogs" element={<Blogs />} />
      </Route>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Routers;
