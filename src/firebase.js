import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "qrifo-2459a.firebaseapp.com",
  projectId: "qrifo-2459a",
  storageBucket: "qrifo-2459a.appspot.com",
  messagingSenderId: "1054062165699",
  appId: process.env.REACT_APP_FB_APP_ID
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
