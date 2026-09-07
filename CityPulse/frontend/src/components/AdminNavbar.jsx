import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  }

  return (
    <nav className="admin-navbar">

      <div className="admin-logo">
        CityPulse <span>Admin</span>
      </div>

      <div className="admin-links">

        <Link to="/admin-dashboard">
          Dashboard
        </Link>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default AdminNavbar;