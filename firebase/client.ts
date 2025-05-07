import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-interviewer-6a766.firebaseapp.com",
  projectId: "ai-interviewer-6a766",
  storageBucket: "ai-interviewer-6a766.firebasestorage.app",
  messagingSenderId: "798382549441",
  appId: "1:798382549441:web:20d97f4831af12a9cee740",
  measurementId: "G-JBS600Y586",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
