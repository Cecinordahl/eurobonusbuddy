import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Public web config — safe to commit. Access is enforced by Firestore security rules, not by hiding these values.
const firebaseConfig = {
    apiKey: "AIzaSyAiJ7eCgCH7dmpR5WS0rCOtKS_4SZ34R98",
    authDomain: "eurobonusbuddy.firebaseapp.com",
    projectId: "eurobonusbuddy",
    storageBucket: "eurobonusbuddy.firebasestorage.app",
    messagingSenderId: "953525540290",
    appId: "1:953525540290:web:e9913530c25ca07bee325b",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
