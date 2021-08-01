import 'firebase/auth';
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
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
  auth = firebase.app().auth();
  if (import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST) {
    auth.useEmulator(
      `http://${import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST}`
    );
  }
}

// TODO: use database emulator

export { auth };
