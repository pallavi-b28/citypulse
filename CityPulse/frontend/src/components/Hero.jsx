import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (

    <section className="hero">

      <div className="hero-content">

        <h1>Making Cities Better Together</h1>

        <p>
          Report potholes, garbage, broken streetlights,
          water leaks and other civic issues with just a few clicks.
        </p>

        <button
          onClick={() => navigate("/report")}
        >
          Report Now
        </button>

      </div>

    </section>

  );

}

export default Hero;