// config/firebase.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBa9fUbmnCo3k-TGaUydoHeK0nPJse-77M",
  authDomain: "vidora-a491c.firebaseapp.com",
  projectId: "vidora-a491c",
  storageBucket: "vidora-a491c.firebasestorage.app",
  messagingSenderId: "1012346571085",
  appId: "1:1012346571085:web:95b052dc398e5d4f2fcf04",
  measurementId: "G-NLLY28BRS5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Firestore & Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
