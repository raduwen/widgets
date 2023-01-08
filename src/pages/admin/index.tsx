import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { ref, onValue, DataSnapshot } from '@firebase/database';
import { useAuth } from '@/lib/AuthProvider';
import { getFirebaseDB } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { Navbar } from '@/components/admin/Navbar';

const AdminIndex = () => {
const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<string[]>([]);

  useEffect(() => {
    onValue(ref(getFirebaseDB(), '/profiles'), (snap: DataSnapshot) => {
      setProfiles(Object.keys(snap.val()));
    });
  }, []);

  console.log(profiles);

  return (
    <>
      <Head>
        <title>Admin - Raduwen OBS Widgets</title>
      </Head>
      {
        currentUser ? (
          <>
            <CssBaseline />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
            }}>
              <Navbar />
              <Container sx={{ flex: 1, overflow: 'auto' }}>
                <div>
                  <Typography variant="h4" component="h2" sx={{ mt: 4 }}>Profiles</Typography>
                  <Box sx={{ mt: 4, display: 'flex' }}>
                    <Box>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs:1, sm: 2, md: 4}}>
                        {profiles.map((profile) => (
                          <Link key={profile} href={`/admin/${profile}`}>{profile}</Link>
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </div>
              </Container>
            </Box>
          </>
        ) : (
            <Signin />
        )
      }
    </>
  );
}

const AdminIndexPage = () => {
  return (
    <>
      <Head>
        <title>Admin - Raduwen OBS Widgets</title>
      </Head>
      <AdminIndex />
    </>
  );
};

export default AdminIndexPage;
