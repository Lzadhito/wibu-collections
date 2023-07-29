import { AnimeListItem } from '@/app/types/anime';
import { AnimeContext } from '@/context/AnimeContext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { generateTxtDesc, generateTxtTitle } from './locales';
import { txtCancel, txtOk } from '@/app/locales';

interface Props {
  anime: AnimeListItem;
  onClose: () => void;
  collectionName: string;
}
export default function DeleteConfirmationDialog({ anime, onClose, collectionName }: Props) {
  const { removeFromCollection } = useContext(AnimeContext);

  function handleClickRemove() {
    removeFromCollection(anime.id, collectionName);
  }

  const animeName = anime.title.english || anime.title.native || '';

  return (
    <Dialog open>
      <DialogTitle>{generateTxtTitle(animeName, collectionName)}</DialogTitle>
      <DialogContent>{generateTxtDesc(animeName, collectionName)}</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          {txtCancel}
        </Button>
        <Button color="error" variant="contained" onClick={handleClickRemove}>
          {txtOk}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
