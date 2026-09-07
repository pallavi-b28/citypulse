import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Welcome() {

  const navigate = useNavigate();

  useEffect(() => {

    function handleKeyDown(e) {

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {

        navigate("/portal-9x7a-admin");

      }

    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [navigate]);

  return (

    <div className="welcome-page">

      <div className="welcome-card">

        <h1>🏙️ CityPulse</h1>

        <h2>Empowering Citizens. Improving Cities.</h2>

        <p>
          Report potholes, garbage, broken streetlights,
          water leaks and other civic issues in seconds.
        </p>

        <div className="welcome-features">

          <div>📍 GPS Location</div>

          <div>📷 Image Upload</div>

          <div>📊 Track Complaint Status</div>

        </div>

        <div className="welcome-buttons">

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Welcome;