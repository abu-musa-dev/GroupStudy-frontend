import React, { useState } from "react";
import { auth } from "../../firebase";  // Ensure Firebase auth is properly imported
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../Footer/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      setError("Password must contain at least 6 characters, an uppercase and a lowercase letter.");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name and photo
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      navigate("/home"); // Navigate to home page after successful registration
    } catch (error) {
      setError(error.message); // Set the error message to state
      toast.error("Registration failed! Please try again.");
      console.log(error.message); // Log the exact error message for debugging
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Profile Photo URL (Optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 01-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.14.437-.292.869-.458 1.285M15 12a3 3 0 01-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 01-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.14.437-.292.869-.458 1.285M15 12a3 3 0 01-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
        <Toaster />
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Register;
