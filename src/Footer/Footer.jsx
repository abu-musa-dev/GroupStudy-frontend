import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white py-12 border-t-2 border-gray-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <p className="mb-4">
              <strong>Address:</strong> Dhanmondi, Dhaka 1205, Bangladesh
            </p>
            <p className="mb-4">
              <strong>Email:</strong> info@example.com
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> (+880) 1629-916-877
            </p>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-6">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://facebook.com"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>

          {/* About Us and Copyright Notice */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">About Us</h2>
            <p className="text-lg mb-6">
              We are dedicated to helping those in need during the winter season by providing warm clothing and other essential items.
            </p>
            <p className="text-sm mt-6">
              &copy; {new Date().getFullYear()} Shiter Bondhu. All rights reserved.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-12 border-t border-gray-600 pt-6">
          <p className="text-sm text-gray-400">
            Designed and Developed by{" "}
            <span className="font-semibold">Abu Musa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
