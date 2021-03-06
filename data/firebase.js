import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj9ZK1Ii9Oqewi_AVnW2LmFLRcWsBvtGk",
  authDomain: "reactappscursos.firebaseapp.com",
  projectId: "reactappscursos",
  storageBucket: "reactappscursos.appspot.com",
  messagingSenderId: "431154747627",
  appId: "1:431154747627:web:a7c1a4650779de0de306ae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
