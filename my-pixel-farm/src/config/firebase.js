import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_1OWd9PafNW7xO5w4ljuzLulQTHzXNDE",
  authDomain: "project-6449264268116042623.firebaseapp.com",
  projectId: "project-6449264268116042623",
  storageBucket: "project-6449264268116042623.firebasestorage.app",
  messagingSenderId: "92166328998",
  appId: "1:92166328998:web:ebe648d41e12b1b7131a67"
};

let db = null;
let auth = null;
let isCloudEnabled = false;
const appId = typeof window !== 'undefined' && window.__app_id ? window.__app_id : 'default-app-id';

try {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig, "pixel-rpg");
  auth = getAuth(app);
  db = getFirestore(app);
  isCloudEnabled = true;
} catch (e) {
  isCloudEnabled = false;
}

export { auth, db, isCloudEnabled, appId };