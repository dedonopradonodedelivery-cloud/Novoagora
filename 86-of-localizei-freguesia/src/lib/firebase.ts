import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRnSCjx8wCpsde5hyz1K9heVV7Cp7540o",
  authDomain: "localizei-freguesia.firebaseapp.com",
  projectId: "localizei-freguesia",
  storageBucket: "localizei-freguesia.firebasestorage.app",
  messagingSenderId: "67565726336",
  appId: "1:67565726336:web:9eaacaecabf9f5cb9a5465"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();