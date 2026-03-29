export * from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged as onAuth
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Sign up with Email and Password
export const signUpWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Log in with Email and Password
export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Log in with Google
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// Log out
export const logOut = async () => {
  return await signOut(auth);
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return onAuth(auth, callback);
};
