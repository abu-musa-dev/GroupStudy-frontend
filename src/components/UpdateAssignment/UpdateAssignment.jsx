import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Error fetching assignment',
        text: 'Unable to fetch assignment details!',
      }));
  }, [id]);

  // Form validation function
  const isFormValid = () => {
    const { title, description, marks, difficulty, dueDate } = assignment;
    // All fields must be filled out
    if (!title || !description || !marks || !difficulty || !dueDate) {
      return false;
    }
    // Marks should be a positive number
    if (marks <= 0 || isNaN(marks)) {
      return false;
    }
    // Difficulty should be one of the allowed values
    const validDifficulties = ["easy", "medium", "hard"];
    if (!validDifficulties.includes(difficulty.toLowerCase())) {
      return false;
    }
    // Due date should be in the future
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    if (dueDateObj < currentDate) {
      return false;
    }
    return true;
  };

  // Handle form submission to update the assignment
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated assignment data
    const updatedAssignment = { ...assignment };

    // Check if the form is valid
    if (!isFormValid()) {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Error',
        text: 'Please fill all fields correctly!',
      });
      return;
    }

    axios
      .put(`http://localhost:5000/api/assignments/${id}`, updatedAssignment)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Assignment updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/assignments"); // Redirect after showing the success message
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error updating assignment',
          text: error.message || 'Something went wrong!',
        });
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
