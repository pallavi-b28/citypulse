import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Contact() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />

      <div className="contact-page">

        <div className="contact-card">

          <h1>Contact Us</h1>

          <p className="contact-intro">
            Have questions, suggestions, or want to contribute towards making
            our city cleaner and smarter? We'd love to hear from you!
          </p>

          <div className="contact-info">

            <div className="contact-item">
              <h3>🏢 Organization</h3>
              <p>CityPulse Youth Club</p>
            </div>

            <div className="contact-item">
              <h3>📍 Address</h3>
              <p>
                CityPulse Youth Club Office
                <br />
                Smart City Community Center
                <br />
                Mangalore, Karnataka - 575001
              </p>
            </div>

            <div className="contact-item">
              <h3>📞 Phone</h3>
              <p>+91 8618989807</p>
            </div>

            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>support@citypulse.org</p>
            </div>

            <div className="contact-item">
              <h3>🕒 Working Hours</h3>
              <p>
                Monday - Saturday
                <br />
                9:00 AM – 6:00 PM
              </p>
            </div>

          </div>

          <div className="contact-message">

            <h2>Together We Can Build a Better City 🌱</h2>

            <p>
              CityPulse is a youth-led initiative dedicated to encouraging
              citizens to report civic issues, collaborate with local
              authorities, and actively participate in improving the city's
              infrastructure. Every report you submit helps create a cleaner,
              safer, and smarter community.
            </p>

          </div>

        </div>

      </div>

    </>
  );
}

export default Contact;