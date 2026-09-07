import { useState } from "react";
import axios from "axios";

function ReportForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [success, setSuccess] = useState("");
  const [locationSuccess, setLocationSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const [errors, setErrors] = useState({});

  async function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          setLocation(data.display_name);

          setLocationSuccess(
            "📍 Current location detected successfully."
          );
        } catch {
          setLocation(`${latitude}, ${longitude}`);
        }

        setGettingLocation(false);
      },
      (error) => {
        alert(error.message);
        setGettingLocation(false);
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSuccess("");
    setLocationSuccess("");

    let validationErrors = {};

    if (!title.trim())
      validationErrors.title = "Issue title is required";

    if (!category)
      validationErrors.category = "Please select category";

    if (category === "Other" && !otherIssue.trim())
      validationErrors.otherIssue = "Specify issue";

    if (!description.trim())
      validationErrors.description = "Description required";

    if (!location.trim())
      validationErrors.location = "Location required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);

      formData.append("category", category);

      formData.append(
        "description",
        category === "Other"
          ? `${description}\n\nSpecified Issue: ${otherIssue}`
          : description
      );

      formData.append("location", location);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://127.0.0.1:8000/api/complaints/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("✅ Complaint submitted successfully!");

      setTitle("");
      setCategory("");
      setOtherIssue("");
      setDescription("");
      setLocation("");
      setImage(null);
      setPreview(null);
      setErrors({});
    } catch (error) {
      console.log(error.response);

      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));
    }

    setLoading(false);
  }

  return (
    <>
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="report-form">

        <label>Issue Title</label>

        <input
          type="text"
          value={title}
          placeholder="Enter issue title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {errors.title && <p className="error">{errors.title}</p>}

        <label>Category</label>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);

            if (e.target.value !== "Other") {
              setOtherIssue("");
            }
          }}
        >
          <option value="">Select Category</option>

          <option>Pothole</option>

          <option>Garbage</option>

          <option>Street Light</option>

          <option>Water Leakage</option>

          <option>Drainage</option>

          <option>Road Damage</option>

          <option>Traffic Signal</option>

          <option>Other</option>

        </select>

        {errors.category && (
          <p className="error">{errors.category}</p>
        )}

        {category === "Other" && (
          <>
            <label>Specify Issue</label>

            <input
              type="text"
              value={otherIssue}
              onChange={(e) =>
                setOtherIssue(e.target.value)
              }
            />

            {errors.otherIssue && (
              <p className="error">
                {errors.otherIssue}
              </p>
            )}
          </>
        )}

        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        {errors.description && (
          <p className="error">
            {errors.description}
          </p>
        )}

        <label>Location</label>

        <div className="location-group">

          <input
            type="text"
            value={location}
            readOnly={gettingLocation}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <button
            type="button"
            className="location-btn"
            onClick={getCurrentLocation}
          >
            {gettingLocation
              ? "Locating..."
              : "📍 Use My Location"}
          </button>

        </div>

        {locationSuccess && (
          <p className="location-success">
            {locationSuccess}
          </p>
        )}

        {errors.location && (
          <p className="error">
            {errors.location}
          </p>
        )}

        <label>Upload Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Submitting..."
            : "Submit Complaint"}
        </button>

      </form>
    </>
  );
}

export default ReportForm;