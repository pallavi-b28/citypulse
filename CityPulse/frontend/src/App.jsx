import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyReports from "./pages/MyReports";
import ComplaintDetails from "./pages/ComplaintDetails";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintDetails from "./pages/AdminComplaintDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/report" element={<Report />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/myreports" element={<MyReports />} />

        {/* USER COMPLAINT DETAILS */}
        <Route
          path="/complaint-details/:id"
          element={<ComplaintDetails />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/portal-9x7a-admin"
          element={<AdminLogin />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* ADMIN COMPLAINT DETAILS */}
        <Route
          path="/admin-complaint/:id"
          element={<AdminComplaintDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;