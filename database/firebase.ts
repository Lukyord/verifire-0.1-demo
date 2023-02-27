import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VERIFIRE_FIREBASE_APIKEY,
  authDomain: process.env.VERIFIRE_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VERIFIRE_FIREBASE_PROJECTID,
  storageBucket: process.env.VERIFIRE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VERIFIRE_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VERIFIRE_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
