// src/index.js
import { StrictMode } from "react"; // Importing StrictMode to highlight potential issues in development
import { createRoot } from "react-dom/client"; // To create and render the root React element
import "./index.css"; // Importing the main stylesheet for the project
import { BrowserRouter as Router } from "react-router-dom"; // Importing BrowserRouter for routing functionality
import { AuthProvider } from "./contexts/AuthContext"; // Context provider to manage user authentication state
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // To define and use routes

// Importing all the necessary pages and components for the routes
import Home from "./Pages/Home";
import Details from "./components/Details/Details";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Login/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"; // Protected route component
import ForgotPassword from "./Pages/Login/ForgotPassword";
import Assignments from "./components/Assignments/Assignments";
import PendingAssignments from "./components/PendingAssignments/PendingAssignments";
import CreateAssignments from "./components/CreateAssignments/CreateAssignments";
import MyAttemptedAssignments from "./components/MyAttemptedAssignments/MyAttemptedAssignments";
import UpdateAssignment from "./components/UpdateAssignment/UpdateAssignment";
import ViewAssignment from "./components/ViewAssignment/ViewAssignment";
import AssignmentSubmission from "./components/AssignmentSubmission/AssignmentSubmission";

// Define routes using createBrowserRouter for routing
const router = createBrowserRouter([
  {
    path: "/", // Home page
    element: <Home />, 
  },
  {
    path: "/home", // Home page (duplicate of root path)
    element: <Home />,
  },
  {
    path: "/assignments/:id", // Route to view a specific assignment by ID
    element: <ViewAssignment></ViewAssignment>,
  },
  {
    path: "/assignments/submit/:id", // Route for submitting an assignment by ID
    element: <AssignmentSubmission></AssignmentSubmission>,
  },

  {
    path: "/update/:id", // Route for updating an assignment by ID (Protected)
    element: (
      <PrivateRoute> 
        <UpdateAssignment />
      </PrivateRoute>
    ),
  },

  {
    path: "/assignments", // Route for displaying all assignments
    element: <Assignments />,
  },
  {
    path: "/view/:id", // Route to view a specific assignment (Protected)
    element: (
      <PrivateRoute>
        <ViewAssignment></ViewAssignment>
      </PrivateRoute>
    ),
  },
  {
    path: "/pending-assignments", // Route to show pending assignments (Protected)
    element: (
      <PrivateRoute>
        <PendingAssignments></PendingAssignments>
      </PrivateRoute>
    ), 
  },
  {
    path: "/create-assignments", // Route to create new assignments (Protected)
    element: (
      <PrivateRoute>
        <CreateAssignments></CreateAssignments>
      </PrivateRoute>
    ),
  },
  {
    path: "/my-attempted-assignments", // Route to view the user's attempted assignments (Protected)
    element: (
      <PrivateRoute>
        <MyAttemptedAssignments></MyAttemptedAssignments>
      </PrivateRoute>
    ), 
  },
  {
    path: "/campaigns/:id", // Route for viewing campaign details (Protected)
    element: (
      <PrivateRoute>
        <Details />
      </PrivateRoute>
    ), 
  },
  {
    path: "/login", // Login page
    element: <Login />, 
  },
  {
    path: "/register", // Register page
    element: <Register />, 
  },
  {
    path: "/forgot-password", // Forgot password page
    element: <ForgotPassword></ForgotPassword>, 
  },

  {
    path: "*", // Wildcard for invalid routes (404 page)
    element: <NotFound />, // 404 NotFound page
  },
]);

// Render the application using StrictMode to highlight issues in development
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Provide authentication context to the whole app */}
      <RouterProvider router={router} /> {/* Provide the router with defined routes */}
    </AuthProvider>
  </StrictMode>
);
