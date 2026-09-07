function Features() {
  return (
    <section className="features">
      <h2>Why Choose CityPulse?</h2>

      <div className="feature-container">

        <div className="feature-card">
          <h3>📍 Easy Reporting</h3>

          <p>
            Report potholes, garbage, broken streetlights,
            water leaks and other civic issues within seconds.
          </p>
        </div>

        <div className="feature-card">
          <h3>📷 Upload Evidence</h3>

          <p>
            Upload images of the issue to help authorities
            understand the problem quickly and accurately.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Track Complaint Status</h3>

          <p>
            Monitor every complaint from <b>Pending</b> to
            <b> In Progress</b> and finally <b>Resolved</b>.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;