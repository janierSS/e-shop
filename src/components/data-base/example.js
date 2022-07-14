// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClLcA4mTU2dwznvjWaRWgaoBfc7A0GDB0",
  authDomain: "eshop-database-64303.firebaseapp.com",
  projectId: "eshop-database-64303",
  storageBucket: "eshop-database-64303.appspot.com",
  messagingSenderId: "953158253616",
  appId: "1:953158253616:web:87122561d94bf210f281f5",
  measurementId: "G-H5XETGSXNF",
};

// Init Firebase App
initializeApp(firebaseConfig);

//Init services
const db = getFirestore();


//colection Ref
const colRef = collection(db, "users");

//get collection data
getDoc(colRef)
  .then((snapchot) => {})
  .catch((error) => alert(error));

//adding documents
addDoc(colRef, {})
  .then(() => {})
  .catch((error) => alert(error));

//deleting documents   ******id needs to be replaced with real id******
const docRef = doc(db, "users", id);
deleteDoc(docRef)
  .then(() => {})
  .catch((error) => alert(error));

//queries
const q = query(colRef, where("user", "==", { firstname: "Janier", lastname: "Sanchez" }));

//get collection data in real time(listener to q)
onSnapshot(q, (snapchot) => {

});

// const firebaseApp = firebase.initializeApp(firebaseConfig)

// const db = firebaseApp.firestore()

// const auth = firebase.auth()

// // const getid = getAuth()

export { db, auth };
