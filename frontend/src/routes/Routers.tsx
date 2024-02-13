import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "../privateRoutes/ProtectedRoutes";

const WriteBlog = lazy(() => import("../pages/WriteBlog"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const BlogsList = lazy(() => import("../pages/BlogsList"));
const Blog = lazy(() => import("../pages/Blog"));
const UpdateBlog = lazy(() => import("../pages/UpdateBlog"));

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
        <Route
          path="/writeBlog"
          element={
            <Suspense>
              <WriteBlog />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/blogs"
          element={
            <Suspense>
              <BlogsList />
            </Suspense>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Suspense>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/updateBlog/:id"
          element={
            <Suspense>
              <UpdateBlog />
            </Suspense>
          }
        />
      </Route>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Routers;
