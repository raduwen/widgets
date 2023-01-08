import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getApps, initializeApp } from 'firebase/app';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const getConfig = () => {
  return config;
}

const getFirebaseApp = () =>  {
  if (getApps().length > 0)
    return getApps()[0];
  else
    return initializeApp(getConfig());
}

const getFirebaseAuth = () => {
  return getAuth(getFirebaseApp());
}

const getFirebaseDB = () => {
  return getDatabase(getFirebaseApp());
}

export { getFirebaseApp, getFirebaseAuth, getFirebaseDB };
