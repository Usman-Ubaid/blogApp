import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Routers;
