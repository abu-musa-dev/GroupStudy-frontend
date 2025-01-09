import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // AuthContext থেকে useAuth ইমপোর্ট করা

const MyAttemptedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true); // লোডিং স্টেট
  const { currentUser } = useAuth(); // AuthContext থেকে currentUser নেওয়া

  // ব্যবহারকারীর ইমেইল নেওয়া
  const currentUserEmail = currentUser?.email;

  useEffect(() => {
    if (currentUserEmail) {
      setLoading(true); // লোডিং শুরু
      fetch(`http://localhost:5000/api/assignments?email=${currentUserEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setAssignments(data);
          setLoading(false); // লোডিং শেষ
        })
        .catch((error) => {
          console.error('Error fetching assignments:', error);
          setLoading(false); // লোডিং শেষ
        });
    }
  }, [currentUserEmail]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Attempted Assignments</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Max Marks</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Obtained Marks</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <tr key={assignment._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800">{assignment.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-800 capitalize">
                      {assignment.status || 'Pending'} {/* 'Pending' fallback */}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">{assignment.marks || 'N/A'}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">
                      {assignment.obtainedMarks !== undefined ? assignment.obtainedMarks : 'Not yet marked'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">
                      {assignment.feedback ? assignment.feedback : 'No feedback yet'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center text-sm text-gray-500">
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAttemptedAssignments;
