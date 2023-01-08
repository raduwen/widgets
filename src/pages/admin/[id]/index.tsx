import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Container,
  Box,
} from '@mui/material';
import { useAuth } from '@/lib/AuthProvider';
import { Signin } from '@/components/admin/signin';
import { Navbar } from '@/components/admin/Navbar';
import { LeftSideBar } from '@/components/admin/LeftSideNav';
import { EditorMap } from '@/components/widgets';

type Widget = {
  name: string;
  id: string;
}

const Admin = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);

  const currentProfile = router.query.id as string;

  const Editor = currentWidget ? EditorMap[currentWidget.name] : null;

  return (
    <>
      <Head>
        <title>{currentProfile} : Admin - Raduwen OBS Widgets</title>
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
              overflowY: 'scroll',
            }}>
              <Navbar profile={currentProfile} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <LeftSideBar
                  profile={currentProfile}
                  selectWidget={(widget) => {
                    setCurrentWidget(widget);
                  }}
                />
                <Box component="main">
                  <Container sx={{ pt: 4, flex: 1, overflow: 'auto' }}>
                    {currentWidget && Editor && <Editor id={currentWidget.id} profile={currentProfile} />}
                  </Container>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
            <Signin />
          )
      }
    </>
  );
};

const AdminPage = () => {
  const router = useRouter();

  const currentProfile = router.query.id as string;

  return (
    <>
      <Head>
        <title>{currentProfile} : Admin - Raduwen OBS Widgets</title>
      </Head>
      <Admin />
    </>
  );
};

export default AdminPage;
