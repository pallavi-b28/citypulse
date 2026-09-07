import AdminNavbar from "../components/AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

function AdminComplaintDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  console.log("Complaint Data:", state);

  if (!state) {
    return (
      <>
        <AdminNavbar />

        <div className="details-page">
          <div className="details-card">

            <h1>Complaint Not Found</h1>

            <p>No complaint details available.</p>

            <button
              className="back-btn"
              onClick={() => navigate("/admin-dashboard")}
            >
              ← Back to Dashboard
            </button>

          </div>
        </div>
      </>
    );
  }

  const complaintNumber = `CP-${new Date().getFullYear()}-${String(
    state.id || 0
  ).padStart(6, "0")}`;

  return (
    <>
      <AdminNavbar />

      <div className="details-page">
        <div className="details-card">

          <h1>Complaint Details</h1>

          <h2>{state.title || "No Title"}</h2>

          {state.image ? (
            <img
              src={state.image}
              alt="Complaint"
              className="details-image"
            />
          ) : null}

          <div className="details-info">

            <p><strong>Complaint No:</strong> {complaintNumber}</p>

            <p><strong>Category:</strong> {state.category || "-"}</p>

            <p><strong>Department:</strong> {state.department || "Not Assigned"}</p>

            <p><strong>Status:</strong> {state.status || "-"}</p>

            <p><strong>Location:</strong> {state.location || "-"}</p>

            <p>
              <strong>Date Reported:</strong>{" "}
              {state.created_at
                ? new Date(state.created_at).toLocaleString()
                : "-"}
            </p>

            {state.status === "Resolved" && (
  <>
    <p>
      <strong>Rating :</strong>{" "}
      {state.rating
        ? `${state.rating} ⭐`
        : "Not Rated"}
    </p>

    <p>
      <strong>User Feedback :</strong>{" "}
      {state.feedback
        ? state.feedback
        : "No Feedback"}
    </p>
  </>
)}

           {state.status === "Resolved" && (
  <p>
    <strong>Resolution Notes :</strong>{" "}
    {state.resolution_note
      ? state.resolution_note
      : "Not Available"}
  </p>
)}

          </div>

          <div className="description-box">

            <h2>Description</h2>

            <p>{state.description || "-"}</p>

          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/admin-dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>
      </div>
    </>
  );
}

export default AdminComplaintDetails;