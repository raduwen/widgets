import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Button,
} from '@mui/material';
import { ref, set } from '@firebase/database';
import { getFirebaseDB } from '@/lib/firebase';

type AddProfileDialogProps = {
  open: boolean;
  onClose: () => void;
};

const AddProfileDialog = ({ open, onClose }: AddProfileDialogProps) => {
  const [profileId, setProfileId] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Profile</DialogTitle>
      <DialogContent>
        <FormControl variant="standard">
          <TextField required autoFocus fullWidth label="ID" value={profileId} variant="standard" onChange={(e) => { setProfileId(e.target.value); }} />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() =>{
          if (profileId.length > 0) {
            set(ref(getFirebaseDB(), `/profiles/${profileId}/name`), profileId);
            setProfileId("");
            onClose();
          }
        }}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddProfileDialog };
export type { AddProfileDialogProps };
