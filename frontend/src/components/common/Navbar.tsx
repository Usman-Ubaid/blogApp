import { Link } from "react-router-dom";

const Navbar = () => {
  const pageLinks = [
    { id: 1, to: "/login", item: "Login" },
    { id: 2, to: "/register", item: "Register" },
  ];

  return (
    <div className="navbar-wrapper">
      <ul className="navbar-list">
        {pageLinks.map((link) => (
          <li key={link.id}>
            <Link to={link.to}>{link.item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
