import { useEffect, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import {
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  TextField,
  Select,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
} from '@mui/material';
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { User } from '@firebase/auth';
import { ref, set, onValue, DataSnapshot } from '@firebase/database';

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
  const profile = 'default';

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
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
          return <Editor key={id} id={id} props={widget.props} profile={profile} />
        })
      }
    </div>
  );
};

const AddWidgetModel = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const profile = 'default';
  const [widgetId, setWidgetId] = useState("");
  const [widgetType, setWidgetType] = useState("text");

  const FormGroup = styled.div`
    display: flex;
    margin-bottom: 1rem;
    & > div {
      flex-grow: 1;
      margin-left: 0.25rem;
    }
  `;

  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 3,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControl variant="standard">
            <TextField autoFocus fullWidth label="ID" value={widgetId} variant="standard" onChange={(e) => { setWidgetId(e.target.value); }}/>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <FormControl variant="standard">
            <InputLabel id="widget-type-label">Widget</InputLabel>
            <Select
              labelId="widget-type-label"
              id="widget-type"
              value={widgetType}
              label="Widget"
              onChange={(e) => { setWidgetType(e.target.value); }}
            >
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"time"}>Time</MenuItem>
              <MenuItem value={"iframe"}>IFrame</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => {
          set(ref(db, `/profiles/${profile}/widgets/${widgetId}`), {
            name: widgetType,
            props: Editors[widgetType].defaultProps
          });
        }}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminIndexPage = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [addWidgetModalOpened, setAddWidgetModalOpened] = useState(false);
  const isUserMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  });

  const signout = async () => {
    setAnchorEl(null);
    try {
      await auth.signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  const userMenuId = 'user-menu';
  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
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
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={()=>{setAddWidgetModalOpened(true);}}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                edge="end"
                aria-controls={userMenuId}
                aria-haspopup="true"
                onClick={handleUserMenuOpen}
               >
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          id={userMenuId}
          anchorEl={anchorEl}
          open={isUserMenuOpen}
          onClose={handleUserMenuClose}
        >
          <MenuItem color="inherit" onClick={signout}>Logout</MenuItem>
        </Menu>
        <AddWidgetModel
          open={addWidgetModalOpened}
          onClose={() => {
            setAddWidgetModalOpened(false);
          }}
        />

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
