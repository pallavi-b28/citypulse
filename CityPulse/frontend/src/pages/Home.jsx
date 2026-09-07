import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

function Home() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {

    return <Navigate to="/" />;

  }

  return (

    <>

      <Navbar />

      <Hero />

      <Features />

    </>

  );

}

export default Home;