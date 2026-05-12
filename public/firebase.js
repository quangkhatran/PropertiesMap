import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 dán config của bạn vào đây
const firebaseConfig = {
  apiKey: "AIzaSyBsUBX4UQSYDJ6PlntatrXutktM-TevIPs",
  authDomain: "propertiesmap-b304e.firebaseapp.com",
  projectId: "propertiesmap-b304e",
  storageBucket: "propertiesmap-b304e.firebasestorage.app",
  messagingSenderId: "1086401629688",
  appId: "1:1086401629688:web:ab70f99e11a9e7c5df5a0d",
  measurementId: "G-7ZCQVP0W31"
};

// init
const app = initializeApp(firebaseConfig);

// export để dùng ở file khác
export const auth = getAuth(app);
export const db = getFirestore(app);