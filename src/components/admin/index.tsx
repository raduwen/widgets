import React, { VFC, useEffect, useState } from 'react';
import { User } from '@firebase/auth-types';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { AuthProvider } from '@/lib/AuthProvider';
import { auth } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { TextWidgetEditor } from '@/components/TextWidget';

const Editors = {
  'text': TextWidgetEditor,
};

const Widgets: VFC = () => {
  return (
    <div>
      <FirebaseDatabaseNode path="/widgets">
        {d => {
          return (
            <>
              {
                Object.entries(d.value || {}).map(([id, widget]) => {
                  const Editor = Editors[widget.name];
                  return <Editor key={id} id={id} props={widget.props} />
                })
              }
            </>
          );
        }}
      </FirebaseDatabaseNode>
    </div>
  );
}

const Index: VFC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  });

  const signout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  return currentUser !== null ? (
      <AuthProvider>
        <h1>Admin</h1>
        <div>{currentUser?.displayName}</div>
        <button onClick={signout}>Sign Out</button>
        <Widgets />
      </AuthProvider>
    ) : (
      <Signin />
    )
  ;
};

export { Index };
