// Importa las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase (SIN variables de entorno, todo literal)
const firebaseConfig = {
  apiKey: "AIzaSyBWySKZvkX3ELmV--2KJ6V7qHoG-CO41s0",
  authDomain: "p3sisdis.firebaseapp.com",
  projectId: "p3sisdis",
  storageBucket: "p3sisdis.appspot.com", // CORRECTO para Firestore y Storage
  messagingSenderId: "213738124363",
  appId: "1:213738124363:web:f22ac28c68d18dd0a609ce"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app; 