import React, { useState } from 'react';

const App = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'React Basics',
      marks: null,
      examinee: 'John Doe',
      status: 'pending',
      submittedBy: 'john@example.com',
      googleDocLink: 'https://docs.google.com/document/d/123',
      notes: 'Please evaluate my assignment.',
    },
    {
      id: 2,
      title: 'Advanced React',
      marks: 85,
      examinee: 'Jane Smith',
      status: 'completed',
      submittedBy: 'jane@example.com',
      googleDocLink: 'https://docs.google.com/document/d/456',
      notes: 'Let me know if you need clarification.',
    },
    {
      id: 3,
      title: 'Redux Implementation',
      marks: null,
      examinee: 'Alice Brown',
      status: 'pending',
      submittedBy: 'alice@example.com',
      googleDocLink: 'https://docs.google.com/document/d/789',
      notes: 'I have added detailed comments.',
    },
  ]);

  const currentUser = 'examiner@example.com'; // Current logged-in user
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGiveMark = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleMarkSubmit = () => {
    if (marks && feedback) {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === selectedAssignment.id
            ? { ...assignment, marks, status: 'completed' }
            : assignment
        )
      );
      setSelectedAssignment(null);
      setMarks('');
      setFeedback('');
      alert('Marks and feedback submitted successfully!');
    } else {
      alert('Please fill out both marks and feedback.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pending Assignments</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Examinee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments
            .filter(
              (assignment) =>
                assignment.status === 'pending' && assignment.submittedBy !== currentUser
            )
            .map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.examinee}</td>
                <td>
                  <button onClick={() => handleGiveMark(assignment)}>Give Mark</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedAssignment && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h2>Mark Assignment</h2>
          <p>
            <strong>Title:</strong> {selectedAssignment.title}
          </p>
          <p>
            <strong>Google Docs Link:</strong>{' '}
            <a
              href={selectedAssignment.googleDocLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Document
            </a>
          </p>
          <p>
            <strong>Notes:</strong> {selectedAssignment.notes}
          </p>
          <div style={{ marginBottom: '10px' }}>
            <label>Marks: </label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Feedback: </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              cols="50"
              style={{ marginLeft: '10px' }}
            ></textarea>
          </div>
          <button onClick={handleMarkSubmit} style={{ marginRight: '10px' }}>
            Submit
          </button>
          <button onClick={() => setSelectedAssignment(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
