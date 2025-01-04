// Import the necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWzLiAElYzNtOnlE3m5Q9QSlqu9GN_UP0",
  authDomain: "groupstudy-479ec.firebaseapp.com",
  projectId: "groupstudy-479ec",
  storageBucket: "groupstudy-479ec.firebasestorage.app",
  messagingSenderId: "832335571231",
  appId: "1:832335571231:web:9e7cb8a2b25ea927a3282a",
  measurementId: "G-V4TD3ZSZ7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Google Auth provider
const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      // Optionally, you can send user information to your database
    })
    .catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
};

// Function to sign out
export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};

// Export the auth and provider for use in other parts of the application
export { auth, provider, signInWithPopup, signOut };
