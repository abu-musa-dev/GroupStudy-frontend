import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { Search, Filter } from "lucide-react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const { currentUser } = useAuth();
  const currentUserEmail = currentUser?.email;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, [difficulty, searchTerm]);

  const fetchAssignments = () => {
    const query = new URLSearchParams();
    if (difficulty) query.append("difficulty", difficulty);
    if (searchTerm) query.append("search", searchTerm);

    // Get the JWT token from localStorage
    const token = localStorage.getItem("token");

    fetch(`https://group-study-backend-rho.vercel.app/assignments?${query.toString()}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) return res.json();
        if (res.status === 401) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
          throw new Error("Unauthorized");
        }
        return Promise.reject("Failed to fetch assignments");
      })
      .then(data => setAssignments(data))
      .catch(() => toast.error("Error fetching assignments"));
  };

  const handleDeleteClick = (id, creatorEmail) => {
    if (!currentUser) {
      toast.error("Please log in to delete assignments.");
      navigate("/login");
      return;
    }

    if (currentUserEmail !== creatorEmail) {
      return toast.error("You are not authorized to delete this assignment.");
    }

    setAssignmentToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const token = localStorage.getItem("token");

    fetch(`https://group-study-backend-rho.vercel.app/assignments/${assignmentToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          toast.success("Assignment deleted");
          setDeleteModalOpen(false);
          setAssignmentToDelete(null);
          fetchAssignments();
        } else if (res.status === 401) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
        } else {
          throw new Error("Error deleting assignment");
        }
      })
      .catch(() => toast.error("Error deleting assignment"));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Assignments</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-gray-500" />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full md:w-52 shadow-sm focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-1/2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full shadow-sm focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Assignment Grid */}
        {assignments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{a.title}</h2>
                  <p className="text-gray-600">Marks: {a.marks}</p>
                  <p className="text-gray-600 capitalize">Difficulty: {a.difficulty}</p>
                  <p className="text-gray-500 text-sm mt-2">Created by: {a.creatorEmail}</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => navigate(`/view/${a._id}`)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/update/${a._id}`)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(a._id, a.creatorEmail)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">No assignments found.</p>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
              <p className="text-gray-600 mt-3">Are you sure you want to delete this assignment?</p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm
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

export default Assignments;
