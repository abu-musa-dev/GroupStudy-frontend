import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password);

  // ✅ Function to fetch and store JWT
  const getJWTAndNavigate = async (userEmail) => {
    try {
      const res = await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("JWT token not received.");
      }
    } catch (error) {
      toast.error("Failed to get JWT token");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      toast.error("Please enter a valid email.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters, include uppercase and lowercase.");
      toast.error("Password format is incorrect.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await getJWTAndNavigate(userCredential.user.email);
    } catch (err) {
      setError(err.message);
      toast.error("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await getJWTAndNavigate(result.user.email);
    } catch (err) {
      toast.error("Google Login failed. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-white flex items-center justify-center px-4">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Left illustration or branding */}
          <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-blue-600 text-white p-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg">Start collaborating and learning today.</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between text-sm">
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register here
              </a>
            </p>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                <FcGoogle size={24} className="mr-2" />
                <span className="font-medium text-gray-700">Login with Google</span>
              </button>
            </div>
            <Toaster />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
