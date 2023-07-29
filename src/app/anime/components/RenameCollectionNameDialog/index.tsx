import { useContext, useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { txtEdit } from '@/app/components/locales';
import { AnimeContext } from '@/context/AnimeContext';

import { txtNewCollection, txtRename } from './locales';
import { txtCancel } from '@/app/locales';

interface Props {
  collectionName: string;
  onClose: () => void;
  onSubmit?: (newCollectionName: string) => void;
}

export default function RenameCollectionNameDialog({ collectionName, onClose, onSubmit }: Props) {
  const [newCollectionName, setNewCollectionName] = useState(collectionName);
  const [errorMessage, setErrorMessage] = useState('');
  const { editCollectionName } = useContext(AnimeContext);

  function handleSubmitRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      editCollectionName(collectionName, newCollectionName);
      onClose();
      if (onSubmit) onSubmit(newCollectionName);
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
  }

  return (
    <Dialog open>
      <DialogTitle>{`${txtRename} ${collectionName}`}</DialogTitle>
      <form onSubmit={handleSubmitRename}>
        <DialogContent>
          <TextField
            error={!!errorMessage}
            helperText={errorMessage}
            required
            placeholder={txtNewCollection}
            variant="standard"
            size="small"
            value={newCollectionName}
            onChange={(event) => setNewCollectionName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="text" onClick={onClose}>
            {txtCancel}
          </Button>
          <Button type="submit" size="small" variant="contained">
            {txtEdit}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
