import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CardActions, CardContent, Typography } from '@mui/material';
import type { AnimeListItem } from '@/app/types/anime';
import Image from 'next/image';

import useScreenSize from '@/hooks/useScreenSize';
import LazyDeleteConfirmationDialog from './components/DeleteConfirmationDialog/lazy';
import { txtRemove } from '../locales';
import { StyledCardMedia, StyledCheckbox, StyledDeleteBtn, StyledCard, StyledCardContent } from './styles';
import { useAmp } from 'next/amp';

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
  const isAmp = useAmp();
  const router = useRouter();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isMobile } = useScreenSize();

  function handleClick() {
    if (showCheckbox && onClick) onClick(anime);
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
        <StyledCardMedia showCheckbox={!!showCheckbox}>
          {isAmp ? (
            <amp-img
              width="200"
              height="200"
              src={anime?.coverImage?.extraLarge}
              alt={anime.title.native}
              layout="fixed"
            />
          ) : (
            <Image priority src={anime.coverImage.large} alt={anime.title.native} width={200} height={200} />
          )}
        </StyledCardMedia>
        <StyledCardContent>
          <Typography fontWeight="bold" variant={isMobile ? 'caption' : 'body1'}>
            {anime.title?.english || anime.title?.native || ''}
          </Typography>
        </StyledCardContent>
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
