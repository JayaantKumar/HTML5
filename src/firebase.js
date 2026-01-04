import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxzyeWMJj-GD5PKUp-4fBOYqeOuc7JDHw",
  authDomain: "html5-1400e.firebaseapp.com",
  projectId: "html5-1400e",
  storageBucket: "html5-1400e.firebasestorage.app",
  messagingSenderId: "655419566396",
  appId: "1:655419566396:web:d6a308568033348cb61639",
  measurementId: "G-S6MGC2YD40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const storage = getStorage(app);