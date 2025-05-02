import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 py-16  border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4">📍 Contact Us</h3>
          <p className="mb-2">Dhanmondi, Dhaka 1205, Bangladesh</p>
          <p className="mb-2">info@example.com</p>
          <p>(+880) 1629-916-877</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">🌐 Follow Us</h3>
          <div className="flex space-x-4 text-indigo-600">
            <a href="https://facebook.com" className="hover:text-indigo-800"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" className="hover:text-indigo-800"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" className="hover:text-indigo-800"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" className="hover:text-indigo-800"><FaLinkedin size={24} /></a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">💡 About</h3>
          <p className="text-sm">
            Join our collaborative platform where learning is interactive, fun, and effective. Designed to help you stay ahead!
          </p>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GroupStudy. Crafted by Abu Musa.
      </div>
    </footer>
  );
};

export default Footer;
