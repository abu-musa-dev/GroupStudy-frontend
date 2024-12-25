// src/components/UpdateProfile/UpdateProfile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // Ensure the photoURL and displayName are updated when the user data changes
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the profile with the new display name and photo URL
      await updateProfile(currentUser, { displayName, photoURL });

      // After updating the profile, reload the user data to ensure the photo URL is updated
      await currentUser.reload(); // Force re-fetching the user data

      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 w-3/4">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="displayName">
            Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="photoURL">
            Photo URL (Optional)
          </label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL (Optional)"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
