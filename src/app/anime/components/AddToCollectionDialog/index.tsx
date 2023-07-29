import { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import CollectionPreviewList from '@/app/components/CollectionPreviewList';
import type { AnimeListItem } from '@/app/types/anime';
import { AnimeContext } from '@/context/AnimeContext';

import { txtSelectCollection } from '../locales';

interface Props {
  onClose: () => void;
  selectedAnime: AnimeListItem[] | AnimeListItem;
  onSubmit: () => void;
}

export default function AddToCollectionDialog({ onClose, onSubmit, selectedAnime }: Props) {
  const { addToCollection } = useContext(AnimeContext);

  function handleClickCollection(collectionName: string) {
    addToCollection(selectedAnime, collectionName);
    onSubmit();
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{txtSelectCollection}</DialogTitle>
      <DialogContent>
        <CollectionPreviewList onClickCollection={handleClickCollection} />
      </DialogContent>
    </Dialog>
  );
}
