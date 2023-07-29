import { useContext, useState } from 'react';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CardActions, CardContent, Typography } from '@mui/material';
import type { AnimeListItem } from '@/app/types/anime';

import { StyledCard, StyledCardMedia, StyledCheckbox, StyledDeleteBtn } from '../styles';
import { txtRemove } from '../locales';
import LazyDeleteConfirmationDialog from './components/DeleteConfirmationDialog/lazy';
import { AnimeContext } from '@/context/AnimeContext';

interface Props {
  anime: AnimeListItem;
  showCheckbox?: boolean;
  checked?: boolean;
  onClick?: (anime: AnimeListItem) => void;
  showDeleteBtn?: boolean;
  collectionName?: string;
}

export default function AnimeCard({
  anime,
  showCheckbox,
  checked,
  onClick,
  showDeleteBtn = false,
  collectionName,
}: Props) {
  const router = useRouter();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  function handleClick() {
    if (onClick) onClick(anime);
    else router.push(`/anime/${anime.id}`);
  }

  function handleClickRemove(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setShowDeleteConfirmation(true);
  }

  return (
    <>
      <StyledCard onClick={handleClick} key={anime.id}>
        {showCheckbox && <StyledCheckbox disabled checked={checked} />}
        <StyledCardMedia image={anime.coverImage.large} height="180" showCheckbox={!!showCheckbox} />
        <CardContent>
          <Typography align="center" fontWeight="bold">
            {anime.title.english || anime.title.native || ''}
          </Typography>
        </CardContent>
        {showDeleteBtn && (
          <CardActions>
            <StyledDeleteBtn variant="contained" fullWidth onClick={handleClickRemove}>
              {txtRemove}
            </StyledDeleteBtn>
          </CardActions>
        )}
      </StyledCard>
      {showDeleteConfirmation && collectionName ? (
        <LazyDeleteConfirmationDialog
          anime={anime}
          onClose={() => setShowDeleteConfirmation(false)}
          collectionName={collectionName}
        />
      ) : null}
    </>
  );
}
