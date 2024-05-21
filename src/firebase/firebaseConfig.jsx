// Importamos la funcion que inicializara firebase.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Objeto de configuracion

const firebaseConfig = {
  apiKey: "AIzaSyC7EHD_bPeHgW7_uW4UmUU6LINULgocIl0",
  authDomain: "proyecto-46be6.firebaseapp.com",
  projectId: "proyecto-46be6",
  storageBucket: "proyecto-46be6.appspot.com",
  messagingSenderId: "111642061398",
  appId: "1:111642061398:web:0a75f2112168320c1169f7",
  measurementId: "G-EYM1Y29CNV"
};


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth()
export  {db, auth};