
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQTHG8H0crlkD_p851qZPjmwLsfUhj2FY",
  authDomain: "parcial2-arbol-archivos-johan.firebaseapp.com",
  projectId: "parcial2-arbol-archivos-johan",
  storageBucket: "parcial2-arbol-archivos-johan.firebasestorage.app",
  messagingSenderId: "677917702532",
  appId: "1:677917702532:web:4d262156e5cae94ac785d1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
