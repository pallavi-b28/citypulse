import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username,
          password,
        }
      );

      if (response.data.success) {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", response.data.username);

        alert(response.data.message);

        navigate("/home");

      }

    } catch (error) {

      if (error.response) {

        alert(error.response.data.message);

      } else {

        alert("Server Error");

      }

    }

  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>🏙️ CityPulse</h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;