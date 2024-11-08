// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Se for usar Firestore
import { getDatabase } from "firebase/database"; // Se for usar Realtime Database

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAPL9YfRQmo6aYrEDYUPemqQVlGG_r-f-k",
  authDomain: "devgrowthdados.firebaseapp.com",
  projectId: "devgrowthdados",
  storageBucket: "devgrowthdados.firebasestorage.app",
  messagingSenderId: "1080588946569",
  appId: "1:1080588946569:web:27e3ed74fc9505618c4a58"
};

// Tente inicializar o Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase inicializado com sucesso!");
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error);
}

// Inicialize os serviços
const auth = app ? getAuth(app) : null;  // Para autenticação
const firestore = app ? getFirestore(app) : null; // Para Firestore
const database = app ? getDatabase(app) : null; // Para Realtime Database

// Exporte os serviços
export { auth, firestore, database };
