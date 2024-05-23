import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA072UoLJFYVMwRmUC9My6rQJnsX3NEpNk",
    authDomain: "chat-app-24c04.firebaseapp.com",
    projectId: "chat-app-24c04",
    storageBucket: "chat-app-24c04.appspot.com",
    messagingSenderId: "859442981206",
    appId: "1:859442981206:web:3b435a04308df7276fcef7"
}; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
