import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const MyAttemptedAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const currentUserEmail = currentUser?.email;

  useEffect(() => {
    if (currentUserEmail) {
      setLoading(true);
      fetch(`http://localhost:5000/submissions?email=${currentUserEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setSubmissions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching submissions:', error);
          setLoading(false);
        });
    }
  }, [currentUserEmail]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: '#1A685B' }}>
          📄 My Attempted Assignments
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200">
            <table className="min-w-full text-sm sm:text-base">
              <thead style={{ backgroundColor: '#E7F1EF' }}>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[#1A685B]">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#1A685B]">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#1A685B]">Obtained Marks</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#1A685B]">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length > 0 ? (
                  submissions.map((submission) => (
                    <tr key={submission._id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{submission.assignmentTitle}</td>
                      <td
                        className={`px-4 py-3 capitalize font-medium ${
                          submission.status === 'pending'
                            ? 'text-red-500'
                            : submission.status === 'completed'
                            ? 'text-[#1A685B]'
                            : 'text-gray-500'
                        }`}
                      >
                        {submission.status || 'Pending'}
                      </td>
                      <td className="px-4 py-3">
                        {submission.marks !== undefined ? (
                          <span className="font-semibold text-gray-700">{submission.marks}</span>
                        ) : (
                          <span className="text-gray-400 italic">Not yet marked</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {submission.feedback ? (
                          <span>{submission.feedback}</span>
                        ) : (
                          <span className="text-gray-400 italic">No feedback yet</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                      You haven't attempted any assignments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAttemptedAssignments;
