// config/firebase.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔑 Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa9fUbmnCo3k-TGaUydoHeK0nPJse-77M",
  authDomain: "vidora-a491c.firebaseapp.com",
  projectId: "vidora-a491c",
  storageBucket: "vidora-a491c.firebasestorage.app",
  messagingSenderId: "1012346571085",
  appId: "1:1012346571085:web:95b052dc398e5d4f2fcf04",
  measurementId: "G-NLLY28BRS5",
};

// ⚙️ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with persistence for React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

// ✅ Export modules
export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
