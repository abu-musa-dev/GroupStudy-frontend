import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AssignmentSubmission = () => {
  const { id } = useParams(); // Retrieve the assignment ID from URL
  const [googleDocLink, setGoogleDocLink] = useState("");
  const [note, setNote] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("user@example.com"); // Placeholder for current user email

  // Handle submission of the assignment
  const handleSubmitAssignment = () => {
    const submission = {
      googleDocLink,
      note,
      status: "pending", // Set the status as pending by default
      userEmail: currentUserEmail,
    };

    axios
      .post(`http://localhost:5000/api/assignments/submit/${id}`, submission)
      .then((response) => {
        toast.success("Assignment submitted successfully!");
      })
      .catch((error) => {
        toast.error("Error submitting assignment.");
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
