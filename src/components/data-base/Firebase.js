import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyClLcA4mTU2dwznvjWaRWgaoBfc7A0GDB0",
  authDomain: "eshop-database-64303.firebaseapp.com",
  projectId: "eshop-database-64303",
  storageBucket: "eshop-database-64303.appspot.com",
  messagingSenderId: "953158253616",
  appId: "1:953158253616:web:87122561d94bf210f281f5",
  measurementId: "G-H5XETGSXNF",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

export { db, auth };
