import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Import AuthContext
import Swal from "sweetalert2"; // For alerts

const PendingAssignments = () => {
  const { currentUser } = useAuth(); // Get current user
  const [assignments, setAssignments] = useState([]); // Store pending assignments
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Store selected assignment for marking
  const [marks, setMarks] = useState(""); // Marks input
  const [feedback, setFeedback] = useState(""); // Feedback input
  const [loading, setLoading] = useState(true); // Loading state

  const currentUserEmail = currentUser?.email; // Get current user's email

  // Fetch pending assignments
  useEffect(() => {
    fetch('http://localhost:5000/api/assignments/pending')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to check its type and structure
        if (Array.isArray(data)) {
          // Proceed with filter if data is an array
          const filteredData = data.filter(/* your filter logic here */);
          setAssignments(filteredData);
        } else {
          console.error("Expected data to be an array, but got", typeof data);
        }
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);
  

  // Handle "Give Mark" button click
  const handleGiveMark = (assignment) => {
    setSelectedAssignment(assignment);
  };

  // Handle mark submission
  const handleMarkSubmit = () => {
    if (!marks || !feedback) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in both marks and feedback.",
      });
      return;
    }

    const updatedAssignment = {
      marks,
      feedback,
      status: "completed", // Update status to completed
    };

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/assignments/${Assignment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Marks and feedback submitted successfully.",
          });
          setAssignments((prev) =>
            prev.filter((assignment) => assignment._id !== selectedAssignment._id)
          );
          setSelectedAssignment(null);
          setMarks("");
          setFeedback("");
        } else {
          throw new Error("Failed to update assignment.");
        }
      })
      .catch((error) => {
        console.error("Error submitting marks:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong while submitting marks.",
        });
      }); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Pending Assignments</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Examinee</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Marks</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <tr key={assignment._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800">{assignment.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{assignment.userEmail}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">
                      {assignment.marks || "Not yet marked"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">
                      <button
                        onClick={() => handleGiveMark(assignment)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                      >
                        Give Mark
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                    No pending assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Mark Assignment Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Mark Assignment</h2>
            <p>
              <strong>Title:</strong> {selectedAssignment.title}
            </p>
            <p>
              <strong>Google Docs Link:</strong>{" "}
              <a
                href={selectedAssignment.googleDocLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Open Document
              </a>
            </p>
            <p>
              <strong>Notes:</strong> {selectedAssignment.note}
            </p>

            <div className="mb-4">
              <label className="block text-gray-700">Marks: </label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                min="0"
                max="100"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Feedback: </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleMarkSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
