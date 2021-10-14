import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Container,
  Box,
} from '@mui/material';
import { User } from '@firebase/auth';
import { AuthProvider } from '@/lib/AuthProvider';
import { auth } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { Navbar } from '@/components/admin/Navbar';
import { Editors } from '@/components/admin/Editors';

const AdminIndexPage = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const currentProfile = router.query.id as string;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  });

  return (
    <>
      <Head>
        <title>{currentProfile} : Admin - Raduwen OBS Widgets</title>
      </Head>
      {
        currentUser !== null ? (
          <AuthProvider>
            <CssBaseline />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
            }}>
              <Navbar profile={currentProfile} />
              <Container sx={{ flex: 1, overflow: 'auto' }}>
                <Box my={4}>
                  <Editors profile={currentProfile} />
                </Box>
              </Container>
            </Box>
          </AuthProvider>
        ) : (
          <Signin />
        )
      }
    </>
  );
};

export default AdminIndexPage;
