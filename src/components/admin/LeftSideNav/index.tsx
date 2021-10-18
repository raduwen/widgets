import { useState, useEffect } from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  Divider,
} from '@mui/material';
import { ref, onValue, DataSnapshot } from '@firebase/database';
import { db } from '@/lib/firebase';

type Widget = {
  name: string;
  id: string;
};

type LeftSideBarProps = {
  profile: string;
  selectWidget: ({ id, name }: Widget) => void;
}

const LeftSideBar = ({ profile, selectWidget }: LeftSideBarProps) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
    onValue(widgetsRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        const widgets = snap.val();
        setWidgets(
          Object.entries(widgets).map((widget: any) => {
            return {
              name: widget[1].name,
              id: widget[0],
            };
          })
        );
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
          <ListItem key={widget.id}>
            <ListItemButton onClick={() => { selectWidget(widget); }}>
              {widget.id}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { LeftSideBar };
