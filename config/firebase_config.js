// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
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
let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = getAuth(app);

export { auth };

export const db = getFirestore(app);
