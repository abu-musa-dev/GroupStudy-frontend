import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../Navbar/Navbar';
import { auth } from '../../firebase';
import Swal from 'sweetalert2';

const CreateAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [creatorEmail, setCreatorEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!title || !description || !marks || !thumbnail || !difficulty || !dueDate || !creatorEmail) {
      return Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!',
      });
    }

    if (marks <= 0 || isNaN(marks)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid Marks',
        text: 'Marks must be a positive number!',
      });
    }

    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty.toLowerCase())) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid Difficulty',
        text: 'Difficulty must be easy, medium, or hard.',
      });
    }

    const newAssignment = {
      title,
      description,
      marks: parseInt(marks),
      thumbnail,
      difficulty,
      dueDate: dueDate.toISOString(),
      creatorEmail,
    };

    // Get JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      return Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You must be logged in to create an assignment!',
      });
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send JWT token here
        },
        body: JSON.stringify(newAssignment),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Assignment created successfully.',
        });
        setTitle('');
        setDescription('');
        setMarks('');
        setThumbnail('');
        setDifficulty('');
        setDueDate(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data.message || 'An error occurred.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Something went wrong. Try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A685B] mb-8 text-center"> Create New Assignment</h2>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium text-[#1A685B] mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter assignment title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#1A685B] outline-none"
              />
            </div>
  
            <div>
              <label className="block font-medium text-[#1A685B] mb-1">Description</label>
              <textarea
                rows={4}
                placeholder="Enter assignment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#1A685B] outline-none"
              ></textarea>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-[#1A685B] mb-1">Marks</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#1A685B] outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-[#1A685B] mb-1">Thumbnail URL</label>
                <input
                  type="text"
                  placeholder="https://image-link.com"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#1A685B] outline-none"
                />
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt="Thumbnail Preview"
                    className="mt-2 w-full h-32 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-[#1A685B] mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#1A685B] outline-none"
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-[#1A685B] mb-1">Due Date</label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  dateFormat="yyyy/MM/dd"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#1A685B] outline-none"
                  placeholderText="Select a due date"
                />
              </div>
            </div>
  
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-[#1A685B] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#155247] transition duration-200 ${
                  isSubmitting && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Assignment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
