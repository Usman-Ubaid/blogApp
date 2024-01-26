import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-container">
        <Sidebar />
        <div className="main-container">
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
