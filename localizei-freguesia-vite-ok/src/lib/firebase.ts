import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjVHZJ63GhTUKtdN6QFWa5Vc2S0HVV0nQ",
  authDomain: "gen-lang-client-0779365739.firebaseapp.com",
  projectId: "gen-lang-client-0779365739",
  storageBucket: "gen-lang-client-0779365739.firebasestorage.app",
  messagingSenderId: "358395342636",
  appId: "1:358395342636:web:cc651ab4e1520705344689"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();