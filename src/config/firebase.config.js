// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ9MRRrmg3nUmvs2ploX3coGkW5v341mQ",
  authDomain: "task-management-d4708.firebaseapp.com",
  projectId: "task-management-d4708",
  storageBucket: "task-management-d4708.firebasestorage.app",
  messagingSenderId: "618553692988",
  appId: "1:618553692988:web:a3a099939189ea182c4439"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };