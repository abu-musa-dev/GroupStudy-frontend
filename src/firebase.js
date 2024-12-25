// // firebase.js

import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyBibxrfrdmIYPH5wzeQM-ja0kYbqv9XjV4",
  authDomain: "shiter-bondhu.firebaseapp.com",
  projectId: "shiter-bondhu",
  storageBucket: "shiter-bondhu.firebaseapp.com",
  messagingSenderId: "948978127449",
  appId: "1:948978127449:web:132f7cc1f391c8c4b45748"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication

export { auth };



//////////////////////////////////////////////////

// import { initializeApp } from "firebase/app"; //
// import { getAuth } from "firebase/auth"; // 

// // Use environment variables for Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); // Firebase Authentication

// export { auth }; 
