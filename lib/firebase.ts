import firebase from 'firebase';

const config = {
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL:       process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGESING_SENDER_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

function initFirebase() {
  if (firebase.apps.length === 0)  {
    firebase.initializeApp(config);
    if (process.env.NODE_ENV !== 'production') {
      const [host, port] = process.env.NEXT_PUBLIC_FIREBASE_DATABSE_EMULATOR_HOST.split(":");
      firebase.database().useEmulator(host, parseInt(port));
    }
  }
}

export { initFirebase };
