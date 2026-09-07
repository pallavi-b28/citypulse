import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API = "http://127.0.0.1:8000/api/complaints/";

function AdminDashboard() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [resolutionNote, setResolutionNote] = useState("");

    const [showResolutionPopup, setShowResolutionPopup] = useState(false);

    const [statusValue, setStatusValue] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

    async function fetchComplaints() {

        try {

            const response = await axios.get(API);

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    }
        async function updateDepartment(id, department) {

        try {

            await axios.patch(
                `${API}${id}/department/`,
                {
                    department: department,
                }
            );

            fetchComplaints();

        } catch (error) {

            console.log(error);

            alert("Unable to update department.");

        }

    }

    async function updateStatus(id, status) {

        try {

            if (status === "Resolved") {

                const complaint = complaints.find(c => c.id === id);

                setSelectedComplaint(complaint);

                setStatusValue(status);

                setResolutionNote(
                    complaint?.resolution_note || ""
                );

                setShowResolutionPopup(true);

                return;

            }

            await axios.patch(
                `${API}${id}/status/`,
                {
                    status: status,
                }
            );

            fetchComplaints();

        } catch (error) {

            console.log(error);

            alert("Unable to update status.");

        }

    }

    async function saveResolution() {

        try {

            await axios.patch(
                `${API}${selectedComplaint.id}/resolution/`,
                {
                    status: statusValue,
                    resolution_note: resolutionNote,
                }
            );

            setShowResolutionPopup(false);

            setSelectedComplaint(null);

            setResolutionNote("");

            fetchComplaints();

        } catch (error) {

            console.log(error);

            alert("Unable to save resolution.");

        }

    }

    async function deleteComplaint(id) {

        const confirmDelete = window.confirm(
            "Delete this complaint?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`${API}${id}/`);

            fetchComplaints();

        } catch (error) {

            console.log(error);

            alert("Unable to delete complaint.");

        }

    }

    const totalComplaints = complaints.length;

    const pendingCount =
        complaints.filter(
            c => c.status === "Pending"
        ).length;

    const progressCount =
        complaints.filter(
            c => c.status === "In Progress"
        ).length;

    const resolvedCount =
        complaints.filter(
            c => c.status === "Resolved"
        ).length;
        return (
<>
    <Navbar />

    <div className="admin-dashboard">

        <div className="dashboard-cards">

            <div className="dashboard-card">
                <h2>{totalComplaints}</h2>
                <p>Total Complaints</p>
            </div>

            <div className="dashboard-card">
                <h2>{pendingCount}</h2>
                <p>Pending</p>
            </div>

            <div className="dashboard-card">
                <h2>{progressCount}</h2>
                <p>In Progress</p>
            </div>

            <div className="dashboard-card">
                <h2>{resolvedCount}</h2>
                <p>Resolved</p>
            </div>

        </div>

        {loading ? (

            <h2 style={{ textAlign: "center" }}>
                Loading...
            </h2>

        ) : (

        <>

        <div className="table-container">

        <table className="admin-table">

        <thead>

        <tr>

            <th>Complaint No.</th>

            <th>Title</th>

            <th>Category</th>

            <th>Department</th>

            <th>Reminders</th>

            <th>Location</th>

            <th>Status</th>

            <th>Actions</th>

        </tr>

        </thead>

        <tbody>

        {complaints.map((complaint) => (

        <tr key={complaint.id}>

            <td>
                CP-2026-
                {String(complaint.id).padStart(6, "0")}
            </td>

            <td>{complaint.title}</td>

            <td>{complaint.category}</td>

            <td>

                <select

                    value={
                        complaint.department ||
                        "Not Assigned"
                    }

                    onChange={(e) =>
                        updateDepartment(
                            complaint.id,
                            e.target.value
                        )
                    }

                >

                    <option>
                        Not Assigned
                    </option>

                    <option>
                        Road Department
                    </option>

                    <option>
                        Sanitation Department
                    </option>

                    <option>
                        Electricity Department
                    </option>

                    <option>
                        Water Department
                    </option>

                </select>

            </td>

            <td>

                {complaint.reminders?.length || 0}

            </td>

            <td>

                {complaint.location}

            </td>

            <td>

                <select

                    value={complaint.status}

                    onChange={(e) =>
                        updateStatus(
                            complaint.id,
                            e.target.value
                        )
                    }

                >

                    <option>
                        Pending
                    </option>

                    <option>
                        In Progress
                    </option>

                    <option>
                        Resolved
                    </option>

                </select>

            </td>

            <td>

                <div className="action-buttons">

                    <button

                        className="view-icon-btn"

                       onClick={() =>
  navigate(
    navigate(`/admin-complaint/${complaint.id}`)
    {
      state: complaint,
    }
  )
}

                    >

                        <FaEye />

                    </button>

                    <button

                        className="delete-icon-btn"

                        onClick={() =>
                            deleteComplaint(
                                complaint.id
                            )
                        }

                    >

                        <FaTrash />

                    </button>

                </div>

            </td>

        </tr>

        ))}

        </tbody>

        </table>

        </div>
                {/* ==========================
            MOBILE CARDS
        ========================== */}

        <div className="mobile-complaints">

            {complaints.map((complaint) => (

                <div
                    className="mobile-card"
                    key={complaint.id}
                >

                    <h3>
                        CP-2026-
                        {String(complaint.id).padStart(6, "0")}
                    </h3>

                    <h2>{complaint.title}</h2>

                    <p>
                        <strong>Category:</strong>{" "}
                        {complaint.category}
                    </p>

                    <p>
                        <strong>Location:</strong>{" "}
                        {complaint.location}
                    </p>

                    <p>
                        <strong>Department:</strong>
                    </p>

                    <div className="mobile-field">

                        <select
                            value={
                                complaint.department ||
                                "Not Assigned"
                            }
                            onChange={(e) =>
                                updateDepartment(
                                    complaint.id,
                                    e.target.value
                                )
                            }
                        >

                            <option>
                                Not Assigned
                            </option>

                            <option>
                                Road Department
                            </option>

                            <option>
                                Sanitation Department
                            </option>

                            <option>
                                Electricity Department
                            </option>

                            <option>
                                Water Department
                            </option>

                        </select>

                    </div>

                    <p>

                        <strong>Reminders:</strong>{" "}

                        {complaint.reminders?.length || 0}

                    </p>

                    <p>

                        <strong>Status:</strong>

                    </p>

                    <div className="mobile-field">

                        <select

                            value={complaint.status}

                            onChange={(e) =>
                                updateStatus(
                                    complaint.id,
                                    e.target.value
                                )
                            }

                        >

                            <option>
                                Pending
                            </option>

                            <option>
                                In Progress
                            </option>

                            <option>
                                Resolved
                            </option>

                        </select>

                    </div>

                    <div className="mobile-actions">

                        <button

                            className="view-icon-btn"

                            onClick={() =>
                                navigate(
                                    `/complaint-details/${complaint.id}`,
                                    {
                                        state: complaint,
                                    }
                                )
                            }

                        >

                            <FaEye />

                        </button>

                        <button

                            className="delete-icon-btn"

                            onClick={() =>
                                deleteComplaint(
                                    complaint.id
                                )
                            }

                        >

                            <FaTrash />

                        </button>

                    </div>

                </div>

            ))}

        </div>
                {/* ==========================
            RESOLUTION POPUP
        ========================== */}

        {showResolutionPopup && (

            <div className="popup-overlay">

                <div className="popup-card">

                    <h2>Resolve Complaint</h2>

                    <p>
                        Add the resolution details that will be
                        visible to the citizen.
                    </p>

                    <textarea

                        rows="6"

                        placeholder="Example:
• Pothole filled using asphalt mix.
• Road compacted and inspected.
• Issue resolved successfully."

                        value={resolutionNote}

                        onChange={(e) =>
                            setResolutionNote(e.target.value)
                        }

                    />

                    <div className="popup-buttons">

                        <button

                            className="cancel-btn"

                            onClick={() => {

                                setShowResolutionPopup(false);

                                setSelectedComplaint(null);

                                setResolutionNote("");

                            }}

                        >

                            Cancel

                        </button>

                        <button

                            className="save-btn"

                            onClick={saveResolution}

                        >

                            Save Resolution

                        </button>

                    </div>

                </div>

            </div>

        )}
                </>

        )}

    </div>

</>

);

}

export default AdminDashboard;