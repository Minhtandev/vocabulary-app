// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA78FwhDvj6TX2-alYnkiWH9UivtDl6vd8",
  authDomain: "vocabulary-b5de0.firebaseapp.com",
  projectId: "vocabulary-b5de0",
  storageBucket: "vocabulary-b5de0.appspot.com",
  messagingSenderId: "10232345301",
  appId: "1:10232345301:web:f592fc54c050556504a85c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
