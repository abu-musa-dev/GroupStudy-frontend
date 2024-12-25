import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../Navbar/Navbar';

const CreateAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !description || !marks || !thumbnail || !difficulty || !dueDate) {
      alert('Please fill in all the fields.');
      return;
    }

    // Create new assignment object
    const newAssignment = {
      title,
      description,
      marks: parseInt(marks, 10),
      thumbnail,
      difficulty,
      dueDate: dueDate.toISOString(), // Convert date to ISO string
    };

    try {
      // Send POST request to the backend
      const response = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Assignment Created:', data.assignment);
        
        // Show success message
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
        // Show error message if something goes wrong
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Something went wrong!');
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
        
        <form onSubmit={handleSubmit}>
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
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
