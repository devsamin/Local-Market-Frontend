// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKFU3G_BgypqDHsxhvvEm-c3bGK7TDKRo",
  authDomain: "localmarket-fe33f.firebaseapp.com",
  projectId: "localmarket-fe33f",
  storageBucket: "localmarket-fe33f.firebasestorage.app",
  messagingSenderId: "831823459507",
  appId: "1:831823459507:web:968aa3378044f263f92cc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);