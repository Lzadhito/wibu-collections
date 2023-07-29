import { AnimeContext } from '@/context/AnimeContext';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { generateTxtConfirmationDesc, generateTxtConfirmationTitle, txtCancel, txtOk } from './locales';

interface Props {
  handleClose: () => void;
  collectionName: string;
}

export default function DeleteConfirmationModal({ handleClose, collectionName }: Props) {
  const { removeCollection } = useContext(AnimeContext);

  function handleConfirm() {
    removeCollection(collectionName);
    handleClose();
  }

  return (
    <Dialog open onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle>{generateTxtConfirmationTitle(collectionName)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {generateTxtConfirmationDesc(collectionName)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          {txtCancel}
        </Button>
        <Button color="error" variant="contained" onClick={handleConfirm}>
          {txtOk}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
