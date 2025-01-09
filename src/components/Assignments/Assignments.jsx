import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState(""); // Difficulty filter state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const navigate = useNavigate();

  // Get current user from AuthContext
  const { currentUser } = useAuth();
  const currentUserEmail = currentUser?.email;

  // Fetch assignments on load and when filters change
  useEffect(() => {
    fetchAssignments();
  }, [difficulty, searchTerm]);

  const fetchAssignments = () => {
    const query = new URLSearchParams();
    if (difficulty) query.append("difficulty", difficulty);
    if (searchTerm) query.append("search", searchTerm);

    fetch(`http://localhost:5000/api/assignments?${query.toString()}`)
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => {
        toast.error("Error fetching assignments");
      });
  };

  const handleDeleteClick = (id, creatorEmail) => {
    if (currentUserEmail !== creatorEmail) {
      toast.error("You are not authorized to delete this assignment.");
      return;
    }
    setAssignmentToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/api/assignments/${assignmentToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUserEmail}`, // Include email for validation
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Assignment deleted successfully");
          fetchAssignments(); // Refresh the assignments list
        } else {
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Error deleting assignment.");
      });

    setDeleteModalOpen(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setAssignmentToDelete(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Assignments</h1>

        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Difficulty Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="assignment-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{assignment.title}</h2>
              <p className="text-gray-600">Marks: {assignment.marks}</p>
              <p className="text-gray-600">Difficulty: {assignment.difficulty}</p>
              <p className="text-gray-600">Creator: {assignment.creatorEmail}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleDeleteClick(assignment._id, assignment.creatorEmail)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/update/${assignment._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => navigate(`/view/${assignment._id}`)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {assignments.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No assignments found.</p>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <p className="mt-4">Are you sure you want to delete this assignment?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
