import React from 'react';

import '@/global.css';
import { Preview } from '@/components/Preview'
import { Index as Admin } from '@/components/admin'
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from '@react-firebase/database';
import firebase from '@/lib/firebase';

const App = () => {
  const params = new URLSearchParams(location.search);

  const mode = params.get('mode') || 'preview';

  const Component = mode === 'preview' ? Preview :
                    mode === 'admin' ? Admin : <></>;

  return (
    <FirebaseDatabaseProvider firebase={firebase}>
      <Component />
    </FirebaseDatabaseProvider>
  );
};

export { App };
