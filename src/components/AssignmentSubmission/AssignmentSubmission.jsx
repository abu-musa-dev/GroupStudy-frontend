import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../../contexts/AuthContext"; // Correct import path

const AssignmentSubmission = () => {
  const { id } = useParams(); // Retrieve the assignment ID from URL
  const [googleDocLink, setGoogleDocLink] = useState("");
  const [note, setNote] = useState("");
  const { currentUser } = useAuth(); // Access currentUser from context

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
      status: "pending", // Set the status as pending by default
      userEmail: currentUser.email, // Using currentUser's email
    };
    console.log('Submission:', submission); 
    axios
      .post(`http://localhost:5000/api/assignments/submit/${id}`, submission)
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Submit Assignment</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
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
  );
};

export default AssignmentSubmission;
