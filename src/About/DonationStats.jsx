import React, { useEffect } from "react";
import "animate.css/animate.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const DonationStats = () => {
  const stats = [
    { title: "Donations Received", value: "1500+", icon: "💸" },
    { title: "Active Volunteers", value: "120+", icon: "🤝" },
    { title: "People Helped", value: "5000+", icon: "🌟" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset (in px) from the original trigger point
      easing: "ease-in-out", // Easing function
      delay: 100, // Delay before the animation starts
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <section className="py-16 bg-gray-100 ">
      <div className="max-w-6xl mx-auto px-6 w-3/4">
        <h2
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          data-aos="fade-up"
        >
          Donation Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 border-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={`${index * 200}`} // Delay for each item
            >
              <div className="text-4xl mb-4 text-center">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {stat.title}
              </h3>
              <p className="text-gray-600 text-2xl text-center">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationStats;
