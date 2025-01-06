// src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home';
import Campaigns from './components/Campaigns/Campaigns';
import Details from './components/Details/Details';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Login/Register';
import Dashboard from './Dashboard/Dashboard'
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ForgotPassword from './Pages/Login/ForgotPassword';
import HowToHelp from './components/HowtoHelp/HowtoHelp';
import Assignments from './components/Assignments/Assignments';
import PendingAssignments from './components/PendingAssignments/PendingAssignments';
import CreateAssignments from './components/CreateAssignments/CreateAssignments';
import MyAttemptedAssignments from './components/MyAttemptedAssignments/MyAttemptedAssignments';
import UpdateAssignment from './components/UpdateAssignment/UpdateAssignment';
import ViewAssignment from './components/ViewAssignment/ViewAssignment';
import AssignmentSubmission from './components/AssignmentSubmission/AssignmentSubmission';
// import { UserProvider } from "./components/UserContext";  // Path অনুযায়ী ঠিক করুন

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home /> // Home Page
  },
  {
    path: "/home",
    element: <Home /> // Home Page
  },
  {
    path: "/assignments/:id",
    element:  <ViewAssignment></ViewAssignment>
  },
  {
    path: "/assignments/submit/:id",
    element:  <AssignmentSubmission></AssignmentSubmission>
  },
  {
    path: "/howtohelp",
    element: <HowToHelp></HowToHelp> // Home Page
  },
  {
    path: "/update/:id",
    element: <UpdateAssignment />
  },
  
 
  {
    path: "/view/:id",
    element: <ViewAssignment></ViewAssignment>
  },
 
  {
    path: "/assignments",
    element:  <Assignments />
  
  },
  {
    path: "/pending-assignments",
    element: <PendingAssignments></PendingAssignments> // Campaigns Page
  },
  {
    path: "/create-assignments",
    element: <CreateAssignments></CreateAssignments> // Campaigns Page
  },
  {
    path: "/my-attempted-assignments",
    element: <MyAttemptedAssignments></MyAttemptedAssignments> // Campaigns Page
  },
  {
    path: "/campaigns/:id",
    element: (
      <PrivateRoute>
        <Details />
      </PrivateRoute>
    ) // Campaign Details Page
  },
  {
    path: "/login",
    element: <Login /> // Login Page
  },
  {
    path: "/register",
    element: <Register /> // Register Page
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>// Register Page
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ) // Dashboard Page
  },
  {
    path: "/update-profile",
    element: (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    ) // Update Profile Page
  },
  {
    path: "*", // Invalid Routes
    element: <NotFound /> // 404 Page
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
