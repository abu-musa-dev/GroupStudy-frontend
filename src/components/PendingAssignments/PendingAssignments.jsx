import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const PendingAssignments = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUserEmail = currentUser?.email;
  const token = localStorage.getItem("token"); // Retrieve JWT from localStorage

  useEffect(() => {
    if (!currentUserEmail) return;

    setLoading(true);
    // Fetch pending assignments with Authorization header
    fetch(`https://group-study-backend-rho.vercel.app/submissions?status=pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token to header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAssignments(data);
        } else {
          console.error("Expected data array");
        }
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setLoading(false));
  }, [currentUserEmail, token]);

  const handleGiveMark = (assignment) => {
    if (assignment.userEmail !== currentUserEmail) {
      setSelectedAssignment(assignment);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You cannot mark your own assignment.",
      });
    }
  };

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

    // PUT request to update the assignment with JWT token in header
    fetch(`https://group-study-backend-rho.vercel.app/submissions/${selectedAssignment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token to header
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Marks and feedback submitted.",
          });
          setAssignments((prev) =>
            prev.filter((a) => a._id !== selectedAssignment._id)
          );
          setSelectedAssignment(null);
          setMarks("");
          setFeedback("");
        } else {
          throw new Error("Failed to update.");
        }
      })
      .catch((error) => {
        console.error("Submission error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: "#1A685B" }}>
          📋 Review Pending Assignments
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500">No pending assignments found.</p>
        ) : (
          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full text-sm sm:text-base">
              <thead style={{ backgroundColor: "#E7F1EF", color: "#1A685B" }}>
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Examinee</th>
                  <th className="px-4 py-3 text-left font-medium">Marks</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{assignment.assignmentTitle}</td>
                    <td className="px-4 py-3">{assignment.userEmail}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {assignment.marks || (
                        <span className="text-gray-400 italic">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleGiveMark(assignment)}
                        style={{ backgroundColor: "#1A685B" }}
                        className="hover:opacity-90 text-white text-sm px-4 py-2 rounded transition"
                      >
                        Give Mark
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
              <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Mark Assignment</h2>

              <p className="mb-2">
                <strong>Title:</strong> {selectedAssignment.assignmentTitle}
              </p>
              <p className="mb-2">
                <strong>Notes:</strong> {selectedAssignment.note}
              </p>
              <p className="mb-4">
                <strong>Document:</strong>{" "}
                <a
                  href={selectedAssignment.googleDocLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1A685B] underline hover:text-green-700"
                >
                  Open
                </a>
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Marks</label>
                <input
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#1A685B] focus:border-[#1A685B]"
                  min="0"
                  max="100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#1A685B] focus:border-[#1A685B]"
                  rows="3"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMarkSubmit}
                  style={{ backgroundColor: "#1A685B" }}
                  className="px-4 py-2 hover:opacity-90 text-white rounded text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PendingAssignments;
