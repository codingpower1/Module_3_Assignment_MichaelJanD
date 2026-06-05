import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOobghHJ0eiuTB3rTXWa29cn4K-vMzHu8",
    authDomain: "module-3-33f91.firebaseapp.com",
    projectId: "module-3-33f91",
    storageBucket: "module-3-33f91.firebasestorage.app",
    messagingSenderId: "986555579962",
    appId: "1:986555579962:web:a36c9ab8452ce6ebc97f03",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db: any = getFirestore(app);