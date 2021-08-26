import React from 'react';

import '@/global.css';
import { Preview } from '@/components/Preview'
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from '@/lib/firebase';

const PreviewApp = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase}>
      <Preview />
    </FirebaseDatabaseProvider>
  );
};

export { PreviewApp };
