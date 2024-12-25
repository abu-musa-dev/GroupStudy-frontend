import React, { useState } from "react";
import { auth } from "../../firebase";  // Ensure Firebase auth is properly imported
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle Login with Email & Password
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      toast.success("Login Successful!");
      navigate("/home");  // Navigate to home page after successful login
    } catch (error) {
      setError(error.message);  // Set the error message to state
      toast.error("Login failed! Please check your credentials.");
    }
  };

  // Handle Login with Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Google Login Successful!");
      navigate("/home");  // Navigate to home page after successful Google login
    } catch (error) {
      toast.error("Google Login failed! Please try again.");
      console.log(error.message);  // Log error for debugging
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login with Google
          </button>
        </div>

        <Toaster />
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Login;
