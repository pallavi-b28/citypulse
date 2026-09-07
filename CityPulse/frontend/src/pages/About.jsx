import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function About() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />

      <div className="about-page">

        <div className="about-card">

          <h1>About CityPulse</h1>

          <p className="about-intro">
            CityPulse is a smart civic issue reporting platform designed to
            bridge the gap between citizens and local authorities. Our mission
            is to empower every citizen to report civic issues quickly,
            transparently, and efficiently, helping create cleaner, safer,
            and smarter cities.
          </p>

          <div className="about-section">

            <div className="about-item">
              <h3>🎯 Our Mission</h3>

              <p>
                To encourage active citizen participation by providing a
                simple platform where issues like potholes, garbage,
                streetlight failures, water leaks and traffic signal
                problems can be reported directly to the concerned
                departments.
              </p>
            </div>

            <div className="about-item">
              <h3>👁 Our Vision</h3>

              <p>
                To build sustainable smart cities where technology enables
                faster communication, transparent governance and improved
                public infrastructure for everyone.
              </p>
            </div>

          </div>

          <div className="about-features">

            <h2>Key Features</h2>

            <div className="feature-grid">

              <div className="feature-card">
                📍
                <h3>GPS Location</h3>
                <p>
                  Automatically detects the issue location for accurate
                  reporting.
                </p>
              </div>

              <div className="feature-card">
                📸
                <h3>Image Upload</h3>
                <p>
                  Upload images to help authorities understand the issue.
                </p>
              </div>

              <div className="feature-card">
                🏢
                <h3>Department Assignment</h3>
                <p>
                  Complaints are assigned to the relevant department for
                  quicker resolution.
                </p>
              </div>

              <div className="feature-card">
                📊
                <h3>Status Tracking</h3>
                <p>
                  Track complaint progress from Pending to Resolved.
                </p>
              </div>

              <div className="feature-card">
                ⭐
                <h3>Citizen Feedback</h3>
                <p>
                  Users can rate completed complaints and share feedback.
                </p>
              </div>

              <div className="feature-card">
                🔒
                <h3>Secure Access</h3>
                <p>
                  Separate dashboards for citizens and administrators.
                </p>
              </div>

            </div>

          </div>

          <div className="about-tech">

            <h2>Technologies Used</h2>

            <div className="tech-list">
              <span>React.js</span>
              <span>Django</span>
              <span>Django REST Framework</span>
              <span>SQLite</span>
              <span>Axios</span>
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
            </div>

          </div>

          <div className="about-developer">

            <h2>Developed By</h2>

            <p><strong>Pallavi Bhat</strong></p>

            <p>Computer Science & Business Systems</p>

            <p>Canara Engineering College</p>

            <p>
              CityPulse is developed as a civic-tech platform that empowers
              citizens to participate in building smarter and cleaner cities
              through digital innovation.
            </p>

          </div>

        </div>

      </div>

    </>
  );
}

export default About;