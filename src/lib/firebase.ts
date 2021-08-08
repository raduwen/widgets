import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let auth;
let db;
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
  auth = firebase.app().auth();
  db = firebase.database();
}

export default firebase;
export { auth, db };
