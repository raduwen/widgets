import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Container,
  Toolbar,
  Box,
} from '@mui/material';
import { User } from '@firebase/auth';
import { AuthProvider } from '@/lib/AuthProvider';
import { auth } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { Navbar } from '@/components/admin/Navbar';
import { LeftSideBar } from '@/components/admin/LeftSideNav';
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
            <Toolbar/>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              overflowY: 'scroll',
            }}>
              <Navbar profile={currentProfile} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <LeftSideBar profile={currentProfile} />
                <Box component="main">
                  <Container sx={{ pt: 4, flex: 1, overflow: 'auto' }}>
                    <Editors profile={currentProfile} />
                  </Container>
                </Box>
              </Box>
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
