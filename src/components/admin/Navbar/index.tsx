import { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/router'
import {
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ref, onValue, DataSnapshot } from '@firebase/database';

import { auth, db } from '@/lib/firebase';
import { AddProfileDialog, AddWidgetDialog } from '@/components/admin/Dialog';

type NavbarProps = {
  profile?: string;
}

const Navbar = ({ profile }: NavbarProps) => {
  const router = useRouter();

  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);
  const [addProfileDialogOpened, setAddProfileDialogOpened] = useState(false);
  const [addWidgetDialogOpened, setAddWidgetDialogOpened] = useState(false);
  const [profiles, setProfiles] = useState<string[]>([]);

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

  const isUserMenuOpen = Boolean(userAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const signout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const profilesRef = ref(db, `/profiles`);
    onValue(profilesRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        setProfiles(Object.keys(snap.val()));
      }
    });
  }, []);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          {profile && (<Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile:{' '}
            {profile}
          </Typography>)}
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
              onClick={()=>{setAddWidgetDialogOpened(true);}}
            >
              <AddIcon />
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
      {profile && (<AddWidgetDialog
        profile={profile}
        open={addWidgetDialogOpened}
        onClose={() => {
          setAddWidgetDialogOpened(false);
        }}
      />)}
      <Box m={2} pt={3} />
    </>
  );
};

export { Navbar };
export type { NavbarProps };
