import React from 'react';

import '@/global.css';
import { Index } from '@/components/admin'
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from '@/lib/firebase';

const AdminApp = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase}>
      <Index />
    </FirebaseDatabaseProvider>
  );
};

export { AdminApp };
