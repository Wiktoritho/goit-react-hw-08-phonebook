import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbI3IzMtIczOpPTi16GrcQNRa0rWwF928",
  authDomain: "goit-react-hw-08-phonebo-d441d.firebaseapp.com",
  projectId: "goit-react-hw-08-phonebo-d441d",
  storageBucket: "goit-react-hw-08-phonebo-d441d.appspot.com",
  messagingSenderId: "86081270738",
  appId: "1:86081270738:web:99fe18f64169ad57700e0b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
