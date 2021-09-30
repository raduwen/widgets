import React, { VFC, useEffect, useState } from 'react';
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
import { User } from '@firebase/auth-types';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { AuthProvider } from '@/lib/AuthProvider';
import { auth } from '@/lib/firebase';
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

const Widgets: VFC = () => {
  return (
    <div>
      <FirebaseDatabaseNode path="/widgets">
        {d => {
          return (
            <>
              {
                Object.keys(d.value || {}).map((id) => {
                  const widget: any = d.value[id];
                  const Editor = Editors[widget.name];
                  return <Editor key={id} id={id} props={widget.props} />
                })
              }
            </>
          );
        }}
      </FirebaseDatabaseNode>
    </div>
  );
}

const Index: VFC = () => {
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

export { Index };
