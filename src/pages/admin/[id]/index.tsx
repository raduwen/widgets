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
import { auth, db } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { Navbar } from '@/components/admin/Navbar';
import { LeftSideBar } from '@/components/admin/LeftSideNav';
import { TextWidgetEditor } from '@/components/TextWidget';
import { TimeWidgetEditor } from '@/components/TimeWidget';
import { IFrameWidgetEditor } from '@/components/IFrameWidget';

const EditorMap = {
  text: TextWidgetEditor,
  time: TimeWidgetEditor,
  iframe: IFrameWidgetEditor,
};

type Widget = {
  name: string;
  id: string;
}

const AdminIndexPage = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);

  const currentProfile = router.query.id as string;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const Editor = currentWidget ? EditorMap[currentWidget.name] : null;

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
                    {currentWidget && <Editor id={currentWidget.id} profile={currentProfile} />}
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
