import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav>
      <h2>CityPulse</h2>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/home" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/report" onClick={closeMenu}>
            Report Issue
          </Link>
        </li>

        <li>
          <Link to="/myreports" onClick={closeMenu}>
            My Reports
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>

        <li>
          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;