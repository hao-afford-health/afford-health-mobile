import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA3kRT5lDApJ1LLsgAkztJSz8bBvZaoPfs",
  authDomain: "afford-health.firebaseapp.com",
  projectId: "afford-health",
  storageBucket: "afford-health.appspot.com",
  messagingSenderId: "941477923192",
  appId: "1:941477923192:web:bcc60ce579f8cc7448a08d"
};

export const app = initializeApp(firebaseConfig);