import React, { useState } from "react";

const Assignments = ({ assignments = [], currentUser, deleteAssignment }) => {
  const [deleteModal, setDeleteModal] = useState(null);

  const handleDelete = (assignment) => {
    if (assignment.creatorEmail === currentUser.email) {
      deleteAssignment(assignment.id);
      alert("Assignment deleted successfully!");
    } else {
      alert("Error: You can only delete your own assignments.");
    }
    setDeleteModal(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>
      {assignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="card bg-white shadow-md p-4 rounded-md border"
            >
              <img
                src={assignment.thumbnail}
                alt={assignment.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{assignment.title}</h2>
                <p className="text-gray-600">Marks: {assignment.marks}</p>
                <p className="text-gray-600">
                  Difficulty: {assignment.difficulty}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="btn btn-primary">View</button>
                <button
                  className="btn btn-secondary"
                  onClick={() => alert("Update functionality here")}
                >
                  Update
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => setDeleteModal(assignment)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No assignments available to display.
        </p>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this assignment?
            </h2>
            <p className="mb-6">{deleteModal.title}</p>
            <div className="flex space-x-4">
              <button
                className="btn btn-error"
                onClick={() => handleDelete(deleteModal)}
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteModal(null)}
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

export default Assignments;
