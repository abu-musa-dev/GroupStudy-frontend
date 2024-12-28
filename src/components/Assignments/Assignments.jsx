import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Assignments = ({ currentUserEmail }) => {
  const [assignments, setAssignments] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);  // Modal state
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);  // Store assignment to delete
  const navigate = useNavigate();

  // Fetch assignments
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    fetch("http://localhost:5000/api/assignments")
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
      })
      .catch((error) => toast.error("Error fetching assignments"));
  };

  // Delete Assignment Function
  const handleDeleteClick = (id, creatorEmail) => {
    // Check if the current user is the creator of the assignment
    if (currentUserEmail !== creatorEmail) {
      toast.error("You can only delete assignments created by you.");
      return;
    }
    
    // Show confirmation modal
    setAssignmentToDelete({ id, creatorEmail });
    setDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    const { id, creatorEmail } = assignmentToDelete;

    fetch(`http://localhost:5000/api/assignments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creatorEmail }), // Send creatorEmail in request body
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Assignment deleted successfully") {
          toast.success("Assignment deleted successfully");
          // Refresh the list of assignments after deletion
          fetchAssignments();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => toast.error("Error deleting assignment."));

    // Close the modal
    setDeleteModalOpen(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Assignments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="assignment-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <img
              src={assignment.thumbnail}
              alt="Assignment Thumbnail"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{assignment.title}</h2>
            <p className="text-gray-600">Marks: {assignment.marks}</p>
            <p className="text-gray-600">Difficulty: {assignment.difficulty}</p>
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

      {/* Confirmation Modal */}
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
  );
};

export default Assignments;
