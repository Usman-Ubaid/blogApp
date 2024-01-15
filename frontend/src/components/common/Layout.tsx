import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;