import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; 
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginToastShown, setLoginToastShown] = useState(sessionStorage.getItem("loginToastShown") === "true");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (!loginToastShown) {
          toast.success("Logged in successfully!", { duration: 8000, position: "top-center" });
          setLoginToastShown(true);
          sessionStorage.setItem("loginToastShown", "true");
        }
      } else {
        setUser(null);
        setLoginToastShown(false);
        sessionStorage.removeItem("loginToastShown");
      }
    });

    return () => unsubscribe();
  }, [loginToastShown]);

  useEffect(() => {
    setLoginToastShown(true);
  }, [location.pathname]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
        toast.success("Logged out successfully!", { duration: 8000, position: "top-center" });
        setLoginToastShown(false);
        sessionStorage.removeItem("loginToastShown");
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
        toast.error("Logout failed! Please try again.", { duration: 8000, position: "top-center" });
      });
  };

  return (
    <>
      <div className="navbar bg-base-300 relative z-20 p-5 sticky top-0">
        <div className="flex-1">
          <button className="btn btn-ghost text-xl">GroupStudy</button>
        </div>
        <div className="flex-none hidden md:flex space-x-4">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/assignments" className="btn btn-ghost">Assignments</Link>
          {user && (
            <>
              <Link to="/pending-assignments" className="btn btn-ghost">Pending Assignments</Link>
              <Link to="/create-assignments" className="btn btn-ghost">Create Assignments</Link>
              <Link to="/my-attempted-assignments" className="btn btn-ghost">My Attempted Assignments</Link>
            </>
          )}

          {user ? (
            <div className="flex items-center space-x-2">
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost flex items-center">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <span className="font-bold">Hello, {user.displayName || "User"}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-error w-full">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/assignments">Assignments</Link></li>
            {user && (
              <>
                <li><Link to="/pending-assignments">Pending Assignments</Link></li>
                <li><Link to="/create-assignments">Create Assignments</Link></li>
                <li><Link to="/my-attempted-assignments">My Attempted Assignments</Link></li>
              </>
            )}
            {user ? (
              <li><button onClick={handleLogout} className="btn btn-error w-full">Logout</button></li>
            ) : (
              <li><Link to="/login" className="btn btn-primary">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Navbar;
