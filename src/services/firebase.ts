// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// use env file for API keys
const firebaseConfig = {
  apiKey: "AIzaSyCWzLpfTdJv2lxCHjmIHZH_KS-4PwTEPHQ",
  authDomain: "friendspace-3ed5a.firebaseapp.com",
  projectId: "friendspace-3ed5a",
  storageBucket: "friendspace-3ed5a.appspot.com",
  messagingSenderId: "832469173754",
  appId: "1:832469173754:web:fada285cd5bb94ceac9043",
  measurementId: "G-B1P1272QWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {storage, db, auth};