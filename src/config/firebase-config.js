// Import the functions you need from the SDKs you need

/// this fibase-config act as  a bridge between  the firebase
//then we import stuff from this fire base like get auth, getfirestore
// app project --->(also extarcting from firebase like getauth , getfirestone) firebase- config --->firebase
import { initializeApp } from "firebase/app"; // this is the basic import form the firebase sdk to start  as project
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = { /// this the configuration of our firbease
  apiKey: "AIzaSyClacargCgwccBmEqiaRnKBxxFbytWcHSs", // this api key connect the app with the firebase
  authDomain: "fir-course-78aec.firebaseapp.com",
  projectId: "fir-course-78aec",
  storageBucket: "fir-course-78aec.appspot.com",
  messagingSenderId: "58913818229",
  appId: "1:58913818229:web:122df0cdabcc58e966da3c",
  measurementId: "G-MDDCNYL60W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // then we initalise the app with the configuration
export const auth = getAuth(app); // intergrating the app with the auth feature that we lendt form the fire base
export const googleProvider = new GoogleAuthProvider();
export const db =  getFirestore(app);
export const storage = getStorage(app);