import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPIbV-049VgrPwuw7ejWUebUgyxDQJNbA",
    authDomain: "covid19-kbbk.firebaseapp.com",
    projectId: "covid19-kbbk",
    storageBucket: "covid19-kbbk.appspot.com",
    messagingSenderId: "962438855092",
    appId: "1:962438855092:web:9046378b66d5060c859ae1",
    measurementId: "G-LWQ09Q6Z2N"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;