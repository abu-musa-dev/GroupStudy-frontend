import React, { useState, useEffect } from 'react';

const MyAttemptedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const currentUserEmail = 'user@example.com';  // Replace with dynamic logged-in user email

  // Fetch user's assignments from the backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/?email=${currentUserEmail}`)
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, [currentUserEmail]);

  return (
    <div>
      <h1>My Attempted Assignments</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Max Marks</th>
            <th>Obtained Marks</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.title}</td>
              <td>{assignment.status}</td>
              <td>{assignment.marks}</td>
              <td>{assignment.obtainedMarks ? assignment.obtainedMarks : 'Not yet marked'}</td>
              <td>{assignment.feedback ? assignment.feedback : 'No feedback yet'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttemptedAssignments;
