// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
// Caso queira usar a autenticação, Firestore, etc., importe os módulos necessários aqui
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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços do Firebase que você deseja usar
const auth = getAuth(app);  // Para autenticação
const firestore = getFirestore(app); // Para Firestore (se você for usar)
const database = getDatabase(app); // Para Realtime Database (se você for usar)

export { auth, firestore, database };
