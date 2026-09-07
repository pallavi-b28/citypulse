import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/admin-login/",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminUsername", username);

        navigate("/admin-dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to server.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-avatar">
          🛡️
        </div>

        <h1>CityPulse</h1>

        <h3>Administrator Portal</h3>

        <p>
          Authorized personnel only.
          <br />
          Please sign in to continue.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Administrator Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Admin Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;