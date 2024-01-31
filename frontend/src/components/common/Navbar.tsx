import { Link } from "react-router-dom";
import { getStorageToken } from "../../utils/tokenStorage";

const Navbar = () => {
  const token = getStorageToken();

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
