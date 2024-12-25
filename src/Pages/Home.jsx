import React from "react";
import About from "../About/About";
import Banner from "../components/Banner/Banner";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import Footer from "../Footer/Footer";
import DonationStats from "../About/DonationStats";
import SuccessStories from "../About/SuccessStories";

const Home = () => {
  return (
    <div>
      <Navbar />    {/* Navbar */}
      <Banner />    {/* Banner */}
      <About />     {/* About */}
      <HowItWorks />{/* How it works section */}
      <DonationStats /> {/* Donation Stats Section */}
      <SuccessStories /> {/* Success Stories Section */}

      {/* The Outlet renders the nested route components */}
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Home;
