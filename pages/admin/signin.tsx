import React, { VFC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';

import { SignInForm } from "@/components/admin/SignInForm";

const AdminSigninIndexPage: VFC = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/admin');
    });
  });

  return (
    <>
      <h1>Sign In Admin</h1>
      <SignInForm redirectTo="/admin" />
    </>
  );
};

export default AdminSigninIndexPage;
