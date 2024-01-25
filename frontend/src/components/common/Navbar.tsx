import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  const loginLogoutLink = token ? (
    <button className="btn logout-btn" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <Link to="/login">Login</Link>
  );

  return (
    <div className="navbar-wrapper">
      <h1>
        <Link to="/">Dashboard</Link>
      </h1>
      <ul className="navbar-list">
        <li>{loginLogoutLink}</li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
