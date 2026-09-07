import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [reminderCount, setReminderCount] = useState(0);
  const [lastReminder, setLastReminder] = useState(null);

  useEffect(() => {
    fetchComplaint();
  }, []);

  async function fetchComplaint() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/complaints/${id}/`
      );

      setComplaint(response.data);

      setRating(response.data.rating || 0);
      setFeedback(response.data.feedback || "");

      setReminderCount(response.data.reminder_count || 0);
      setLastReminder(response.data.last_reminder || null);

      if (response.data.rating || response.data.feedback) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load complaint.");
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="details-page">
          <h2 style={{ textAlign: "center" }}>
            Loading Complaint...
          </h2>
        </div>
      </>
    );
  }

  if (!complaint) {
    return (
      <>
        <Navbar />
        <div className="details-page">
          <div className="details-card">
            <h1>Complaint Not Found</h1>

            <button
              className="back-btn"
              onClick={() => navigate("/myreports")}
            >
              ← Back
            </button>
          </div>
        </div>
      </>
    );
  }
    // ==========================================
  // Submit Feedback
  // ==========================================

  async function submitFeedback() {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/complaints/${complaint.id}/feedback/`,
        {
          rating: rating,
          feedback: feedback,
        }
      );

      alert("⭐ Thank you for your feedback!");

      setSubmitted(true);

      fetchComplaint();
    } catch (error) {
      console.log(error.response?.data || error);

      alert("Unable to submit feedback.");
    }
  }

  // ==========================================
  // Send Reminder
  // ==========================================

  async function sendReminder() {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/complaints/${complaint.id}/reminder/`
      );

      setReminderCount(response.data.reminder_count);

      setLastReminder(response.data.last_reminder);

      alert("🔔 Reminder sent successfully!");
    } catch (error) {
      console.log(error.response?.data || error);

      alert("Unable to send reminder.");
    }
  }
    return (
    <>
      <Navbar />

      <div className="details-page">
        <div className="details-card">

          <h1 className="issue-title">
            {complaint.title}
          </h1>

          {complaint.image && (
            <img
              src={complaint.image}
              alt={complaint.title}
              className="details-image"
            />
          )}

          <div className="details-info">

            <p>
              <strong>Category:</strong>
              {" "}
              {complaint.category}
            </p>

            <p>
              <strong>Department:</strong>
              {" "}
              {complaint.department || "Not Assigned"}
            </p>

            <p>
              <strong>Location:</strong>
              {" "}
              {complaint.location}
            </p>

            <p>
              <strong>Date Reported:</strong>
              {" "}
              {complaint.created_at
                ? new Date(
                    complaint.created_at
                  ).toLocaleString()
                : "N/A"}
            </p>

            <p>
              <strong>Status:</strong>

              <span
                className={`status ${complaint.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {complaint.status}
              </span>
            </p>

          </div>

          <div className="description-box">
            <h2>Description</h2>

            <p>
              {complaint.description}
            </p>
          </div>

          {complaint.resolution_note && (
            <div className="description-box">

              <h2>✅ Resolution Notes</h2>

              <p>
                {complaint.resolution_note}
              </p>

            </div>
          )}

          <div className="status-timeline">

            <h2>Complaint Progress</h2>

            <div className="timeline">

              <div className="timeline-step completed">
                ✅ Complaint Submitted
              </div>

              <div
                className={
                  complaint.status === "Pending"
                    ? "timeline-step active"
                    : "timeline-step completed"
                }
              >
                📋 Pending Review
              </div>

              <div
                className={
                  complaint.status === "In Progress"
                    ? "timeline-step active"
                    : complaint.status === "Resolved"
                    ? "timeline-step completed"
                    : "timeline-step"
                }
              >
                🚧 In Progress
              </div>

              <div
                className={
                  complaint.status === "Resolved"
                    ? "timeline-step completed"
                    : "timeline-step"
                }
              >
                🎉 Resolved
              </div>

            </div>

          </div>
                    {/* ===========================
              Reminder Section
          ============================ */}

          {complaint.status !== "Resolved" && (
            <div className="reminder-section">

              <h2>🔔 Send Reminder</h2>

              <p>
                If your complaint has not been resolved yet,
                you can notify the authorities by sending a reminder.
              </p>

              <button
                className="submit-feedback-btn"
                onClick={sendReminder}
              >
                Send Reminder
              </button>

              <div style={{ marginTop: "20px" }}>

                <p>
                  <strong>Total Reminders Sent:</strong>{" "}
                  {reminderCount}
                </p>

                {lastReminder && (
                  <p>
                    <strong>Last Reminder:</strong>{" "}
                    {new Date(lastReminder).toLocaleString()}
                  </p>
                )}

              </div>

            </div>
          )}

          {/* ===========================
              Feedback Section
          ============================ */}

          {complaint.status === "Resolved" && !submitted && (

            <div className="feedback-section">

              <h2>⭐ Rate Your Experience</h2>

              <div className="rating-stars">

                {[1, 2, 3, 4, 5].map((star) => (

                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: "35px",
                      cursor: "pointer",
                      color:
                        star <= rating
                          ? "#FFD700"
                          : "#ccc",
                    }}
                  >
                    ★
                  </span>

                ))}

              </div>

              <textarea
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) =>
                  setFeedback(e.target.value)
                }
                rows="5"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              />

              <button
                className="submit-feedback-btn"
                onClick={submitFeedback}
                style={{ marginTop: "20px" }}
              >
                Submit Feedback
              </button>

            </div>

          )}

          {submitted && (

            <div className="feedback-section">

              <h2>🎉 Thank You!</h2>

              <p>
                Your feedback has been submitted successfully.
              </p>

              <p>
                <strong>Rating:</strong> {rating} ⭐
              </p>

              {feedback && (
                <p>
                  <strong>Your Feedback:</strong><br />
                  {feedback}
                </p>
              )}

            </div>

          )}
                    <div
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <button
              className="back-btn"
              onClick={() => navigate("/myreports")}
            >
              ← Back to My Reports
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ComplaintDetails;