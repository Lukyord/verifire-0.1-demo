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
// const firebaseConfig = {
//   apiKey: "AIzaSyBDwCjg3WTKfBLabm6ZQnsm-69f_OXB83M",
//   authDomain: "verifiredemo.firebaseapp.com",
//   projectId: "verifiredemo",
//   storageBucket: "verifiredemo.appspot.com",
//   messagingSenderId: "856383203610",
//   appId: "1:856383203610:web:f12e9648e89a6c6a8b24a3",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
