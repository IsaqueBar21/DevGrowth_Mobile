// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPL9YfRQmo6aYrEDYUPemqQVlGG_r-f-k",
  authDomain: "devgrowthdados.firebaseapp.com",
  projectId: "devgrowthdados",
  storageBucket: "devgrowthdados.firebasestorage.app",
  messagingSenderId: "1080588946569",
  appId: "1:1080588946569:web:27e3ed74fc9505618c4a58"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
 