import { useEffect, useState, MouseEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles'
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { User } from '@firebase/auth';
import { ref, onValue, DataSnapshot } from '@firebase/database';
import { AuthProvider } from '@/lib/AuthProvider';
import { auth, db } from '@/lib/firebase';
import { Signin } from '@/components/admin/signin';
import { AddProfileDialog } from '@/components/admin/Dialog';

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
  profile: {
    flexGrow: 1
  },
}));

const AdminIndexPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);
  const [addProfileDialogOpened, setAddProfileDialogOpened] = useState(false);
  const [profiles, setProfiles] = useState<string[]>([]);

  const isUserMenuOpen = Boolean(userAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  });

  useEffect(() => {
    const profilesRef = ref(db, `/profiles`);
    onValue(profilesRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        setProfiles(Object.keys(snap.val()));
      }
    });
  }, []);

  const signout = async () => {
    setUserAnchorEl(null);
    setProfileAnchorEl(null);
    try {
      await auth.signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  const userMenuId = 'user-menu';
  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const profileMenuId = 'profile-menu';
  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <>
      <Head>
        <title>Admin - Raduwen OBS Widgets</title>
      </Head>
      {
        currentUser !== null ? (
          <AuthProvider>
            <CssBaseline />
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    Admin
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                      size="large"
                      color="inherit"
                      edge="end"
                      aria-controls={profileMenuId}
                      aria-haspopup="true"
                      aria-expanded={isProfileMenuOpen ? 'true' : undefined}
                      onClick={handleProfileMenuOpen}
                    >
                      <WidgetsIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="inherit"
                      edge="end"
                      aria-controls={userMenuId}
                      aria-haspopup="true"
                      aria-expanded={isUserMenuOpen ? 'true' : undefined}
                      onClick={handleUserMenuOpen}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              <Menu
                id={profileMenuId}
                anchorEl={profileAnchorEl}
                open={isProfileMenuOpen}
                onClose={handleProfileMenuClose}
              >
                {profiles.map((profile) => (
                  <MenuItem key={profile} color="inherit" onClick={() => { router.push(`/admin/${profile}`); }}>{profile}</MenuItem>
                ))}
                <Divider />
                <MenuItem color="inherit" onClick={() => { setAddProfileDialogOpened(true);}}>Add</MenuItem>
              </Menu>
              <Menu
                id={userMenuId}
                anchorEl={userAnchorEl}
                open={isUserMenuOpen}
                onClose={handleUserMenuClose}
              >
                <MenuItem color="inherit" onClick={signout}>Logout</MenuItem>
              </Menu>
              <AddProfileDialog
                open={addProfileDialogOpened}
                onClose={() => {
                  setAddProfileDialogOpened(false);
                }}
              />
            </div>
          </AuthProvider>
        ) : (
          <Signin />
        )
      }
    </>
  );
};

export default AdminIndexPage;
