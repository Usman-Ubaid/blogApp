import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("auth-token");

  return (
    <div className="navbar-wrapper">
      
      <ul className="navbar-list">
        <li>
          <Link to="/login">{!token && "Login"}</Link>
        </li>
        <li>
          <Link to="/register">{!token && "Register"}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
