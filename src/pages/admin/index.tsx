import { useEffect, useState } from 'react';
import {
  makeStyles,
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { User } from '@firebase/auth';
import { ref, onValue, DataSnapshot } from '@firebase/database';

import { AuthProvider } from '@/lib/AuthProvider';
import { auth, db } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { TextWidgetEditor } from '@/components/TextWidget';
import { TimeWidgetEditor } from '@/components/TimeWidget';
import { IFrameWidgetEditor } from '@/components/IFrameWidget';

const Editors = {
  text: TextWidgetEditor,
  time: TimeWidgetEditor,
  iframe: IFrameWidgetEditor,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
  title: {
    flexGrow: 1,
  },
}));

type Widget = {
  name: string;
  props: any;
}

type WidgetList = { [key: string]: Widget }

const Widgets = () => {
  const [widgets, setWidgets] = useState<WidgetList>({});

  useEffect(() => {
    const widgetsRef = ref(db, '/widgets');
    onValue(widgetsRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        setWidgets(snap.val());
      }
    });
  }, []);

  return (
    <div>
      {
        Object.keys(widgets).map((id) => {
          const widget: any = widgets[id];
          const Editor = Editors[widget.name];
          return <Editor key={id} id={id} props={widget.props} />
        })
      }
    </div>
  );
}

const AdminIndexPage = () => {
  const classes = useStyles();
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
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Admin
            </Typography>
            <Typography>{currentUser.email}</Typography>
            <Button color="inherit" onClick={signout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container className={classes.content}>
          <Box my={4}>
            <Widgets />
          </Box>
        </Container>
      </div>
    </AuthProvider>
  ) : (
    <Signin />
  );
};

export default AdminIndexPage;
