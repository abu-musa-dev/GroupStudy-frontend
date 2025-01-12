import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate for redirect
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const ViewAssignment = () => {
  const { id } = useParams(); // Retrieve the assignment ID from URL
  const navigate = useNavigate(); // useNavigate for redirection
  const [assignment, setAssignment] = useState(null);

  // Fetch the assignment details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/assignments/${id}`)
      .then((response) => {
        setAssignment(response.data);
      })
      .catch((error) => toast.error("Error fetching assignment"));
  }, [id]);

  if (!assignment) {
    return <div>Loading...</div>;
  }

  const handleTakeAssignment = () => {
    // Navigate to the assignment submission page
    navigate(`/assignments/submit/${id}`);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{assignment.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={assignment.thumbnail}
          alt="Assignment Thumbnail"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 text-lg mb-4">{assignment.description}</p>
        <p className="text-gray-600">Marks: {assignment.marks}</p>
        <p className="text-gray-600">Difficulty: {assignment.difficulty}</p>
        <p className="text-gray-600">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
        <p className="text-gray-600">Creator: {assignment.creatorEmail}</p>
        
        <button
          onClick={handleTakeAssignment} // Redirecting to AssignmentSubmission page
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Take Assignment
        </button>
      </div>
    </div>
    </div>
  );
};

export default ViewAssignment;
