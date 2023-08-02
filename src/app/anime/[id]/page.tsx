'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAmp } from 'next/amp';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { AppBar, Chip, IconButton, Toolbar, Typography } from '@mui/material';

import type { AnimeDetails } from '@/app/types/anime';
import useScreenSize from '@/hooks/useScreenSize';
import CircularProgressWithLabel from '@/app/components/CircularProgressWithLabel';
import { AnimeContext } from '@/context/AnimeContext';

import GET_ANIME_DETAILS from './graphql/getAnimeDetails';
import { StyledATCBtn, StyledATCBtnContainer, StyledArrowBack, StyledTitleContainer } from '../styles';
import { StyledContainer, StyledRatingContainer, StyledUl } from './styles';
import { txtCategory, txtCollections, txtRating } from './locales';
import { txtAddToCollection } from '../locales';
import LazyAddToCollectionDialog from '../components/AddToCollectionDialog/lazy';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AnimeDetailsPage({ params }: PageProps) {
  const isAmp = useAmp();
  const router = useRouter();
  const { isDesktop } = useScreenSize();
  const { getCollectionsById, removeFromCollection } = useContext(AnimeContext);
  const { data } = useSuspenseQuery<{ Media: AnimeDetails }>(GET_ANIME_DETAILS, { variables: { id: params.id } });

  const [showATCModal, setShowATCModal] = useState(false);

  function handleClickRemoveTag(collectionName: string) {
    removeFromCollection(anime.id, collectionName);
  }

  function handleClickATC() {
    setShowATCModal(true);
  }

  function handleCloseATC() {
    setShowATCModal(false);
  }

  const anime: AnimeDetails = data?.Media;
  const collections = getCollectionsById(anime.id);
  const title = anime?.title?.english || anime?.title?.native;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => router.back()} edge="start" aria-label="back">
            <StyledArrowBack />
          </IconButton>
          <StyledTitleContainer>
            <Typography fontWeight="bold">{title}</Typography>
          </StyledTitleContainer>
        </Toolbar>
      </AppBar>
      <StyledContainer isDesktop={isDesktop}>
        {isAmp ? (
          <amp-img width="375" height="563" src={anime?.coverImage?.extraLarge} alt={title} layout="responsive" />
        ) : (
          <Image priority src={anime?.coverImage?.extraLarge} alt={title} width={375} height={563} />
        )}
        <Typography variant="h6" fontWeight="bold">
          {`${title} (${anime.episodes} episodes)`}
        </Typography>
        <Typography variant="caption" fontWeight={500}>{`${txtCategory}: ${anime.genres.join(', ')}`}</Typography>
        <Typography
          dangerouslySetInnerHTML={{
            __html: anime.description,
          }}
        />
        <StyledRatingContainer>
          <Typography fontWeight="bold" variant="h5">
            {txtRating}
          </Typography>
          <CircularProgressWithLabel size={60} value={anime.averageScore} />
        </StyledRatingContainer>
        {collections.length > 0 ? (
          <>
            <Typography fontWeight="h6">{txtCollections}</Typography>
            <StyledUl>
              {collections.map((collectionName) => (
                <li key={collectionName}>
                  <Chip onDelete={() => handleClickRemoveTag(collectionName)} label={collectionName} variant="filled" />
                </li>
              ))}
            </StyledUl>
          </>
        ) : null}
        <StyledATCBtnContainer>
          <StyledATCBtn onClick={handleClickATC} fullWidth variant="contained">
            {txtAddToCollection}
          </StyledATCBtn>
        </StyledATCBtnContainer>
      </StyledContainer>
      {showATCModal && (
        <LazyAddToCollectionDialog onSubmit={handleCloseATC} onClose={handleCloseATC} selectedAnime={anime} />
      )}
    </>
  );
}
