import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2"; // For alerts
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const PendingAssignments = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState([]); // Store pending assignments
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  const currentUserEmail = currentUser?.email; // Get the email of the current user

  // Fetch pending assignments
  useEffect(() => {
    if (!currentUserEmail) return; // Prevent fetching if the user is not logged in

    setLoading(true); // Set loading state before fetching
    fetch(`http://localhost:5000/api/submissions?status=pending`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pending assignments");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAssignments(data); // Update the state with the fetched assignments
        } else {
          console.error("Expected data array");
        }
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      })
      .finally(() => setLoading(false)); // Turn off loading state
  }, [currentUserEmail]); // Re-run this effect when the email changes

  // Handle "Give Mark" button click
  const handleGiveMark = (assignment) => {
    if (assignment.userEmail !== currentUserEmail) {
      setSelectedAssignment(assignment); // Open modal to give marks if it's not the current user's assignment
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You cannot mark your own assignment.",
      });
    }
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
      status: "completed",
    };

    const token = localStorage.getItem("token"); // Get the token for authorization

    fetch(`http://localhost:5000/api/assignments/${selectedAssignment._id}`, {
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
          ); // Remove the assignment from the list
          setSelectedAssignment(null); // Close the modal
          setMarks(""); // Reset marks input
          setFeedback(""); // Reset feedback input
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
   <div>
    <Navbar></Navbar>
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
<td className="py-4 px-6 text-sm text-gray-800">{assignment.assignmentTitle}</td>
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
            {/* Assignment Title */}
            <p>
              <strong>Assignment Title:</strong> {selectedAssignment.title}
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

            {/* Marks Input */}
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

            {/* Feedback Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Feedback: </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>

            {/* Buttons */}
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
    <Footer></Footer>
   </div>
  );
};

export default PendingAssignments;
