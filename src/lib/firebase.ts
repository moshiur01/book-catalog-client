import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVA0hCYHntPYGLQGNkCUR6Z0RdnJXeqxo",
  authDomain: "the-library-dadd9.firebaseapp.com",
  projectId: "the-library-dadd9",
  storageBucket: "the-library-dadd9.appspot.com",
  messagingSenderId: "784881386968",
  appId: "1:784881386968:web:37f932ffd06c4fb7a25ead",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
