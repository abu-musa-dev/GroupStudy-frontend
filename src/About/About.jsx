import React, { useEffect } from "react";
import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset (in px) from the original trigger point
      easing: 'ease-in-out', // Easing function
      delay: 100, // Delay before the animation starts
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <section className="about-section bg-gray-100 py-10 px-6 sm:px-12 animate__animated animate__fadeInUp">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6" data-aos="fade-up">About Us</h2>
        <p className="text-lg text-gray-600 mb-6" data-aos="fade-up" data-aos-delay="200">
          "Siter Bondhu" is a platform dedicated to bringing people together to support various social causes. Our mission is to create a positive impact by making it easier for people to donate, volunteer, and contribute goods to help those in need.
        </p>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4" data-aos="fade-up" data-aos-delay="400">How You Can Contribute:</h3>
        <ul className="space-y-4 text-lg text-gray-600">
          <li className="flex items-start" data-aos="fade-right">
            <span className="text-2xl text-blue-500 mr-3">💰</span>
            <div>
              <strong className="font-semibold">Monetary Donations:</strong> You can donate money directly through the website to support various causes.
            </div>
          </li>
          <li className="flex items-start" data-aos="fade-right" data-aos-delay="200">
            <span className="text-2xl text-blue-500 mr-3">📦</span>
            <div>
              <strong className="font-semibold">Material Donations:</strong> Donate items like food, clothing, educational materials, or other necessary goods.
            </div>
          </li>
          <li className="flex items-start" data-aos="fade-right" data-aos-delay="400">
            <span className="text-2xl text-blue-500 mr-3">🤝</span>
            <div>
              <strong className="font-semibold">Volunteer:</strong> Offer your time and skills to help with community projects and initiatives.
            </div>
          </li>
          <li className="flex items-start" data-aos="fade-right" data-aos-delay="600">
            <span className="text-2xl text-blue-500 mr-3">📣</span>
            <div>
              <strong className="font-semibold">Spread the Word:</strong> Share our mission and website with your friends and family to help us reach more people.
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
