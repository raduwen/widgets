import React, { VFC, useEffect, useState } from 'react';
import { User } from '@firebase/auth-types';

import { AuthProvider } from '@/lib/AuthProvider';
import { auth } from '@/lib/firebase';
import { Signin } from "@/components/admin/signin";

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
      </AuthProvider>
    ) : (
      <Signin />
    )
  ;
};

export { Index };
