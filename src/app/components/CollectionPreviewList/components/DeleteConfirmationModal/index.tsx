import { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { AnimeContext } from '@/context/AnimeContext';
import { txtCancel, txtOk } from '@/app/locales';
import { generateTxtConfirmationDesc, generateTxtConfirmationTitle } from './locales';

interface Props {
  onClose: () => void;
  collectionName: string;
}

export default function DeleteConfirmationModal({ onClose, collectionName }: Props) {
  const { removeCollection } = useContext(AnimeContext);

  function handleConfirm() {
    removeCollection(collectionName);
    onClose();
  }

  return (
    <Dialog open onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle>{generateTxtConfirmationTitle(collectionName)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {generateTxtConfirmationDesc(collectionName)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          {txtCancel}
        </Button>
        <Button color="error" variant="contained" onClick={handleConfirm}>
          {txtOk}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
