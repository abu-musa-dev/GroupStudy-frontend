// src/components/Dashboard/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Make sure to import useAuth
import Navbar from '../components/Navbar/Navbar';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto p-6 w-3/4">
      <div className="card w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">{currentUser.displayName}</h1>
        <div className="flex flex-col items-center">
          <img 
            src={currentUser.photoURL} 
            alt="Profile" 
            className="w-32 h-32 rounded-full mb-4 border-4 border-primary shadow-xl" 
          />
          <div className="text-lg mb-4">
            <p className="mb-2"><strong>Name:</strong> {currentUser.displayName}</p>
            <p className="mb-2"><strong>Email:</strong> {currentUser.email}</p>
          </div>
          <Link 
            to="/update-profile" 
            className="btn btn-primary mt-4"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
