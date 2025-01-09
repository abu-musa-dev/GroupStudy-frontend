import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../Navbar/Navbar';
import { auth, provider, signInWithPopup, signOut } from '../../firebase';
import Swal from 'sweetalert2';

const CreateAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [creatorEmail, setCreatorEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Google login
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCreatorEmail(user.email);  // Store user's email after successful login
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Handle sign out
  const handleLogout = async () => {
    await signOut(auth);
    setCreatorEmail('');
  };

  // Automatically attempt login on component mount (optional)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCreatorEmail(user.email);
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !marks || !thumbnail || !difficulty || !dueDate || !creatorEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required!',
      });
      return;
    }

    // Validate marks: must be a positive number
    if (marks <= 0 || isNaN(marks)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Marks',
        text: 'Marks should be a positive number!',
      });
      return;
    }

    // Validate difficulty level: it must be one of the valid options
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty.toLowerCase())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Difficulty Level',
        text: 'Please select a valid difficulty level (easy, medium, or hard).',
      });
      return;
    }

    // Create new assignment
    const newAssignment = {
      title,
      description,
      marks: parseInt(marks, 10),
      thumbnail,
      difficulty,
      dueDate: dueDate.toISOString(),
      creatorEmail,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Assignment Created',
          text: 'Assignment created successfully!',
        });
        setSuccessMessage('Assignment created successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);

        // Clear form fields
        setTitle('');
        setDescription('');
        setMarks('');
        setThumbnail('');
        setDifficulty('');
        setDueDate(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: 'Something went wrong!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Create Assignment</h1>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Marks:</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Thumbnail Image URL:</label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Difficulty Level:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Due Date:</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy/MM/dd"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} transition`}
          >
            {isSubmitting ? 'Creating...' : 'Create Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
