import React, { useState, useEffect } from 'react';

const PendingAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const currentUserEmail = 'examiner@example.com';  // Replace with dynamic logged-in user email

  // Fetch pending assignments from the backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/pending?email=${currentUserEmail}`)
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, [currentUserEmail]);

  // Handle marking the assignment
  const handleGiveMark = (assignment) => {
    setSelectedAssignment(assignment);
  };

  // Submit marks and feedback
  const handleMarkSubmit = async () => {
    if (!marks || !feedback) {
      alert('Please fill out both marks and feedback.');
      return;
    }

    const updatedAssignment = {
      ...selectedAssignment,
      marks,
      feedback,
      status: 'completed',  // Change status to completed
    };

    // Update the assignment in the backend
    try {
      await fetch(`http://localhost:5000/api/assignments/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAssignment),
      });

      setAssignments(assignments.map((assignment) =>
        assignment._id === selectedAssignment._id ? updatedAssignment : assignment
      ));
      setSelectedAssignment(null);
      setMarks('');
      setFeedback('');
      alert('Marks and feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting marks:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Assignments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Examinee</th>
              <th className="py-2 px-4 border-b">Marks</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{assignment.title}</td>
                <td className="py-2 px-4 border-b">{assignment.examinee}</td>
                <td className="py-2 px-4 border-b">{assignment.marks ? assignment.marks : 'Not yet marked'}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleGiveMark(assignment)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Give Mark
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Mark Assignment</h2>
            <p><strong>Title:</strong> {selectedAssignment.title}</p>
            <p><strong>Google Docs Link:</strong> <a href={selectedAssignment.googleDocLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">Open Document</a></p>
            <p><strong>Notes:</strong> {selectedAssignment.notes}</p>

            <div className="mb-4">
              <label className="block text-gray-700">Marks: </label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
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
