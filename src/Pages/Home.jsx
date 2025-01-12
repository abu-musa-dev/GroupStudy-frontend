import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import Features from "../components/Features/Features";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Banner />
      <Features  theme={theme}/>
      <FAQ theme={theme} /> {/* theme প্রপস পাঠানো */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
