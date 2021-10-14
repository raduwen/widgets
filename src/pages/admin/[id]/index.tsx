import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Container,
  Box,
} from '@mui/material';
import { User } from '@firebase/auth';
import { ref, onValue, DataSnapshot } from '@firebase/database';
import { AuthProvider } from '@/lib/AuthProvider';
import { auth, db } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { TextWidgetEditor } from '@/components/TextWidget';
import { TimeWidgetEditor } from '@/components/TimeWidget';
import { IFrameWidgetEditor } from '@/components/IFrameWidget';
import { Navbar } from '@/components/admin/Navbar';

const Editors = {
  text: TextWidgetEditor,
  time: TimeWidgetEditor,
  iframe: IFrameWidgetEditor,
};

type Widget = {
  name: string;
}

type WidgetList = { [key: string]: Widget }

const Widgets = ({ profile }: { profile: string }) => {
  const [widgets, setWidgets] = useState<WidgetList>({});

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
    onValue(widgetsRef, (snap: DataSnapshot) => {
      setWidgets(snap.val() || {});
    });
  }, [profile]);

  return (
    <div>
      {
        Object.keys(widgets).map((id) => {
          const widget: any = widgets[id];
          const Editor = Editors[widget.name];
          return <Editor key={`${profile}-${id}`} id={id} profile={profile} />
        })
      }
    </div>
  );
};

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
                  <Widgets profile={currentProfile} />
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
