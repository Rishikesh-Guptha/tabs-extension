// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLSX15gty8jTRPPe4zwGvQy3BxJxIU9gQ",
  authDomain: "surf-sentinel-fc8a9.firebaseapp.com",
  projectId: "surf-sentinel-fc8a9",
  storageBucket: "surf-sentinel-fc8a9.appspot.com",
  messagingSenderId: "7666181085",
  appId: "1:7666181085:web:c56f28e996bd8fd3d5cc34",
  measurementId: "G-3FHBWM8CPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);