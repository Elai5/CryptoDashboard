// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Added this import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlj4JzTl8UuVC2jOd-NVdXksSdiFveqTM",
  authDomain: "cryptodashboard-7dae0.firebaseapp.com",
  projectId: "cryptodashboard-7dae0",
  storageBucket: "cryptodashboard-7dae0.firebasestorage.app",
  messagingSenderId: "870587908223",
  appId: "1:870587908223:web:40910443b7e30ec097ff4a",
  measurementId: "G-V05YW93R7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Added this line

export { app, auth, db }; // Added db to the export