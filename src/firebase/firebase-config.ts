import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi7dKecQZXFLt3m53NaSTCH_enqVtoY-A",
  authDomain: "monkey-blogging-75c9b.firebaseapp.com",
  projectId: "monkey-blogging-75c9b",
  storageBucket: "monkey-blogging-75c9b.appspot.com",
  messagingSenderId: "897182800077",
  appId: "1:897182800077:web:b97206337e464d2f90b184",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
