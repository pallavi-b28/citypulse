import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e) {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        {
          username,
          email,
          password,
        }
      );

      alert(response.data.message);

      navigate("/login");

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

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Register;