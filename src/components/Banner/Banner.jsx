import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      
      {/* Left Side */}
      <div className="max-w-2xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
          Collaborative learning at your{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-2 bg-yellow-300 rounded-full -z-10 animate-pulse"></span>
            <span className="relative">fingertips</span>
          </span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Join group studies, create and submit assignments, and stay ahead with interactive learning. 
          Empower your education journey with collaboration and innovation.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm mb-8">
          {[
            'Create assignments easily',
            'Edit & update anytime',
            'Submit & track progress',
            'Collaborate with groups'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span>✅</span> <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to="/login"><button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition">
            Start Your Journey
          </button></Link>
          <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            See How it Works
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative mt-16 md:mt-0 z-0">
        {/* Blue Circle Background */}
        <div className="bg-blue-900 rounded-full w-80 h-80 md:w-[400px] md:h-[400px] flex items-end justify-center shadow-xl relative overflow-hidden">
          <img 
            src="https://themes.stackbros.in/eduport_r/assets/07-CK3ZrEuH.png" 
            alt="Student" 
            className="h-full object-cover"
          />
        </div>

        {/* Floating Icons */}
        <img 
          src="https://img.icons8.com/ios-filled/50/react-native.png" 
          alt="React Atom" 
          className="absolute top-6 left-[65%] w-10 h-10 animate-bounce"
        />
        <img 
          src="https://img.icons8.com/color/48/figma--v1.png" 
          alt="Figma Icon" 
          className="absolute bottom-10 right-4 w-10 h-10 animate-spin-slow"
        />

        {/* Students Card */}
        <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 bg-green-500 text-white rounded-2xl p-4 shadow-xl w-48">
          <p className="text-sm mb-3">Active Study Groups</p>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((num, i) => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${num}.jpg`}
                className="w-8 h-8 rounded-full border-2 border-white"
                alt={`Student ${num}`}
              />
            ))}
          </div>
          <div className="text-xs mt-2">+1k Members</div>
        </div>

        {/* Congratulations Badge */}
        <div className="absolute bottom-[-20px] left-[-20px] bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
          <div className="bg-yellow-400 p-2 rounded-full text-white text-lg">
            🎉
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Well Done!</p>
            <p className="text-xs text-gray-500">Assignment Submitted</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
