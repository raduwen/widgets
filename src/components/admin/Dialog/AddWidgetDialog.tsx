import { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { ref, set } from '@firebase/database';
import { db } from '@/lib/firebase';
import { EditorMap } from '@/components/widgets';

type AddWidgetDialogProps = {
 profile: string;
 open: boolean;
 onClose: () => void;
};

const AddWidgetDialog = ({ profile, open, onClose }: AddWidgetDialogProps) => {
  const [widgetId, setWidgetId] = useState("");
  const [widgetType, setWidgetType] = useState("text");

  const FormGroup = styled.div`
    display: flex;
    margin-bottom: 1rem;
    & > div {
      fleprofilex-grow: 1;
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
            props: EditorMap[widgetType].defaultProps
          });

          setWidgetId("");
          setWidgetType("text");
          onClose();
        }}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddWidgetDialog };
export type { AddWidgetDialogProps };
