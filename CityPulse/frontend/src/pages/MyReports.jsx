import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  useEffect(() => {
  fetchReports();
}, []);

const fetchReports = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/complaints/"
    );

    setReports(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        report.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        report.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        report.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

  return (
    <>
      <Navbar />

      <div className="myreports-page">
        <h1>My Reports</h1>

        <p>
          Track all your reported civic issues and monitor their
          current status.
        </p>

        <div className="report-controls">

          <input
            type="text"
            placeholder="🔍 Search by title, category or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
          >
            <option>Newest</option>
            <option>Oldest</option>
          </select>

        </div>

        <div className="reports-container">

          {filteredReports.length === 0 ? (

            <div className="no-reports">

              <h2>No Reports Found 📭</h2>

              <p>
                No complaints match your search or you
                haven't submitted any reports yet.
              </p>

              <button
                onClick={() => navigate("/report")}
              >
                Report an Issue
              </button>

            </div>

          ) : (

            filteredReports.map((report) => (

              <div
                key={report.id}
                className="report-card"
              >

                {report.image && (

                  <img
                    src={report.image}
                    alt={report.title}
                    className="report-image"
                  />

                )}

                <h2>{report.title}</h2>

                <p>
                  <strong>Category:</strong>{" "}
                  {report.category}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {report.location}
                </p>

                <p>
  <strong>Reported On:</strong>{" "}
  {new Date(report.created_at).toLocaleString()}
</p>

                <p>
                  <strong>Status:</strong>{" "}

                  <span
                    className={report.status.replace(
                      /\s/g,
                      "-"
                    )}
                  >
                    {report.status}
                  </span>

                </p>

                <button
                  onClick={() =>
                    navigate("/details", {
                      state: report,
                    })
                  }
                >
                  View Details
                </button>

              </div>

            ))

          )}

        </div>
      </div>
    </>
  );
}

export default MyReports;