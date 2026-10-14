
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5cUMMP2B3xRiccTz3e4Ma84Azj8I0tE0",
  authDomain: "challenge07-tasks-johan.firebaseapp.com",
  projectId: "challenge07-tasks-johan",
  storageBucket: "challenge07-tasks-johan.firebasestorage.app",
  messagingSenderId: "809598179407",
  appId: "1:809598179407:web:cd203014e2481ffa8eb23a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
