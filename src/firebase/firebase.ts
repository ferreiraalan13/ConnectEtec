
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB92CvETQ3lfD685pckMHRsDpOsgDPogtQ",
  authDomain: "connectetec-5d4be.firebaseapp.com",
  projectId: "connectetec-5d4be",
  storageBucket: "connectetec-5d4be.appspot.com",
  messagingSenderId: "805371735920",
  appId: "1:805371735920:web:962d35e0ae1036be4829b5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = getAuth(app)