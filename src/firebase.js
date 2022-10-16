// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXGR-1-s78737FMMN2OxfyUEIi14f6Hik",
  authDomain: "to-do-17030.firebaseapp.com",
  projectId: "to-do-17030",
  storageBucket: "to-do-17030.appspot.com",
  messagingSenderId: "530505174950",
  appId: "1:530505174950:web:e9099e40e651f1c2f5c967",
  measurementId: "G-9779Z2SDLS"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }