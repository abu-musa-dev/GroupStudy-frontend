import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const HowToHelp = () => {
  const helpOptions = [
    {
      title: "Donate Clothes",
      description:
        "Help keep someone warm this winter by donating your unused clothes.",
      icon: "👕",
    },
    {
      title: "Volunteer with Us",
      description:
        "Join our team and help distribute donations to those in need.",
      icon: "🤝",
    },
    {
      title: "Spread the Word",
      description:
        "Share our mission with your friends and family to make a bigger impact.",
      icon: "📢",
    },
  ];

  return (
    <div>
        <Navbar></Navbar>
        <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          How You Can Help
        </h2>
        <p className="text-center text-gray-600 mb-12">
          There are many ways you can make a difference this winter season.
          Choose the one that suits you best!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {helpOptions.map((option, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-4 text-center">{option.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {option.title}
              </h3>
              <p className="text-gray-600 text-center">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer></Footer>
    </div>
  );
};

export default HowToHelp;
