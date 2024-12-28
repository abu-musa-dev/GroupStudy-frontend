import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBibxrfrdmIYPH5wzeQM-ja0kYbqv9XjV4',
  authDomain: 'shiter-bondhu.firebaseapp.com',
  projectId: 'shiter-bondhu',
  storageBucket: 'shiter-bondhu.firebaseapp.com',
  messagingSenderId: '948978127449',
  appId: '1:948978127449:web:132f7cc1f391c8c4b45748',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Get the authentication instance

// Google Auth provider
const provider = new GoogleAuthProvider();

// Export functions
export { auth, provider, signInWithPopup, signOut };
