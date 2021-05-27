import { VFC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@firebase/auth-types';

import { AuthProvider } from '@/lib/AuthPropvider';
import { auth } from '@/lib/firebase';

const AdminIndexPage: VFC = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/admin/signin');
    });
  });

  const signout = async () => {
    try {
      await auth.signOut();
      router.push('/admin/signin');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthProvider>
      <h1>Admin</h1>
      <div>{currentUser?.displayName}</div>
      <button onClick={signout}>Sign Out</button>
    </AuthProvider>
  );
};

export default AdminIndexPage;
