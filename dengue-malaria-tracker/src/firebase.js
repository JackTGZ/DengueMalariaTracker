// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvKSv4MvqM1X4p934NqIfBVWkAtLVQOmA",
  authDomain: "denguemalariatracker.firebaseapp.com",
  projectId: "denguemalariatracker",
  storageBucket: "denguemalariatracker.appspot.com",
  messagingSenderId: "399367817443",
  appId: "1:399367817443:web:53894ebdc9a930da8a1dd6",
  measurementId: "G-BWTJEPXWWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;