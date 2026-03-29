import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCruQtw6fq34rhN5Lprk49zJ3364k7tI7E",
  authDomain: "ecommerce-b26de.firebaseapp.com",
  projectId: "ecommerce-b26de",
  storageBucket: "ecommerce-b26de.firebasestorage.app",
  messagingSenderId: "762546925657",
  appId: "1:762546925657:web:28dab6f5d5488225ce0148",
  measurementId: "G-9HHF5VB966"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
