import { useState, useEffect, MouseEvent } from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ref, onValue, DataSnapshot } from '@firebase/database';
import { db } from '@/lib/firebase';

type LeftSideBarProps = {
  profile: string;
}

const LeftSideBar = ({ profile }: LeftSideBarProps) => {
  const [widgets, setWidgets] = useState<string[]>([]);

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
    onValue(widgetsRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        setWidgets(Object.keys(snap.val()));
      }
    });
  }, [profile]);

  const drawerWidth = 160;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {widgets.map((widget) => (
          <ListItem key={widget}>
            <ListItemText>
              <a href={`#${widget}`}>{widget}</a>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { LeftSideBar };
