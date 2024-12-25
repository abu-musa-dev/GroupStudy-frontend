import React, { useEffect } from 'react';
import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
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
    <section className="how-it-works-section bg-gray-100 py-10 px-4 sm:px-8 animate__animated animate__fadeInUp">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6" data-aos="fade-up">How It Works</h2>

        <div className="mb-8" data-aos="fade-right">
          <h3 className="text-2xl font-semibold text-gray-700">1. Donation Instructions</h3>
          <p className="text-lg text-gray-600 mt-2">
            To donate, simply visit the donation page, choose the amount you wish to donate, and select your preferred payment method (credit/debit card, mobile payment, etc.). You will receive a confirmation email after your donation is successfully processed.
          </p>
        </div>

        <div className="mb-8" data-aos="fade-right" data-aos-delay="200">
          <h3 className="text-2xl font-semibold text-gray-700">2. Collection Points</h3>
          <p className="text-lg text-gray-600 mt-2">
            For material donations, you can drop off items at our designated collection points. Visit the "Collection Points" page on our website to find the nearest drop-off location.
          </p>
        </div>

        <div data-aos="fade-right" data-aos-delay="400">
          <h3 className="text-2xl font-semibold text-gray-700">3. Supported Divisions</h3>
          <p className="text-lg text-gray-600 mt-2">We currently support the following divisions:</p>
          <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
            <li>Dhaka</li>
            <li>Chittagong</li>
            <li>Rajshahi</li>
            <li>Khulna</li>
            <li>Barishal</li>
            <li>Sylhet</li>
            <li>Rangpur</li>
            <li>Mymensingh</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
