// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuCUiYD2MJKuJW5IcXVdqUWE4St2H8hi0",
  authDomain: "olheiros-me.firebaseapp.com",
  projectId: "olheiros-me",
  storageBucket: "olheiros-me.appspot.com",
  messagingSenderId: "68443723163",
  appId: "1:68443723163:web:51315aae716e6ba1e87d3e",
  measurementId: "G-XWQW6CFV87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);