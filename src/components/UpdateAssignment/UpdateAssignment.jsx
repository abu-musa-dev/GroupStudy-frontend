import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const UpdateAssignment = () => {
  const { id } = useParams(); // Retrieve the assignment ID from URL
  const [assignment, setAssignment] = useState({});
  const navigate = useNavigate();

  // Fetch assignment details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/assignments/${id}`)
      .then((response) => {
        const fetchedAssignment = response.data;
        setAssignment(fetchedAssignment); // Automatically set the fetched data
      })
      .catch(() => toast.error("Error fetching assignment"));
  }, [id]);

  // Handle form submission to update the assignment
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated assignment data
    const updatedAssignment = { ...assignment };

    axios
      .put(`http://localhost:5000/api/assignments/${id}`, updatedAssignment) // Removed token header
      .then(() => {
        toast.success("Assignment updated successfully");
        navigate("/assignments"); // Redirect to assignments page after success
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating assignment");
      });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };

  // Form validation
  const isFormValid = () => {
    return (
      assignment.title &&
      assignment.description &&
      assignment.marks &&
      assignment.difficulty &&
      assignment.dueDate
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Update Assignment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={assignment.title || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={assignment.description || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Marks</label>
            <input
              type="number"
              name="marks"
              value={assignment.marks || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={assignment.difficulty || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={assignment.dueDate ? assignment.dueDate.split("T")[0] : ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;
