import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ReportForm from "../components/ReportForm";

function Report() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {

    return <Navigate to="/" />;

  }

  return (

    <>

      <Navbar />

      <div className="report-page">

        <h1>Report Civic Issue</h1>

        <p>
          Help improve your city by reporting civic issues.
        </p>

        <ReportForm />

      </div>

    </>

  );

}

export default Report;