import { Link, useNavigate } from "react-router-dom";
import { getStorageToken } from "../../utils/tokenStorage";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = getStorageToken();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <h2>Blog CMS</h2>
      <ul>
        <li>
          {" "}
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/writeBlog">Create Blog</Link>
        </li>
        <li>
          {token && (
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
