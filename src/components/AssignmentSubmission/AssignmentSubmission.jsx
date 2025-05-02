import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../../contexts/AuthContext"; // Correct import path
import Navbar from "../Navbar/Navbar";

const AssignmentSubmission = () => {
  const { id } = useParams(); // Retrieve the assignment ID from URL
  const [googleDocLink, setGoogleDocLink] = useState("");
  const [note, setNote] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState(""); // To store the assignment title
  const { currentUser } = useAuth(); // Access currentUser from context

  // Fetch assignment details by ID
  useEffect(() => {
    axios
      .get(`https://group-study-delta.vercel.app/assignments/${id}`) // Replace with your API endpoint
      .then((response) => {
        const { title } = response.data; // Assuming API response contains `title`
        setAssignmentTitle(title);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to load assignment details.",
        });
      });
  }, [id]);

  // Handle submission of the assignment
  const handleSubmitAssignment = () => {
    if (!googleDocLink || !note || !currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    const submission = {
      googleDocLink,
      note,
      title: assignmentTitle, // Include the assignment title
      status: "pending", // Set the status as pending by default
      userEmail: currentUser.email, // Using currentUser's email
    };

    axios
      .post(`https://group-study-delta.vercel.app/assignments/submit/${id}`, submission)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Assignment submitted successfully!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Error submitting assignment.",
        });
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Submit Assignment</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Assignment Title:</label>
            <p className="font-medium text-lg">{assignmentTitle || "Loading..."}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Google Doc Link:</label>
            <input
              type="url"
              value={googleDocLink}
              onChange={(e) => setGoogleDocLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Quick Note:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitAssignment}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;
