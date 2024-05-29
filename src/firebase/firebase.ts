
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyB8Rw09oOkVvtUPjyDmdNfZbLm0H6xvcWU",
  authDomain: "connectetec-6e89c.firebaseapp.com",
  projectId: "connectetec-6e89c",
  storageBucket: "connectetec-6e89c.appspot.com",
  messagingSenderId: "898148406939",
  appId: "1:898148406939:web:d63a635490db1983a3d83e",
  measurementId: "G-C1D899V8G8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
