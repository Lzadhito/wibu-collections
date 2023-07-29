'use client';
import { useContext, useMemo } from 'react';
import { Masonry } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import useScreenSize from '@/hooks/useScreenSize';

import AnimeCard from '@/app/anime/components/AnimeCard';
import { StyledArrowBack, StyledTitleContainer } from '@/app/anime/styles';
import { AnimeContext } from '@/context/AnimeContext';

import { StyledContainer } from './styles';

interface PageProps {
  params: { collectionName: string };
}

export default function CollectionDetails({ params }: PageProps) {
  const router = useRouter();
  const { collections } = useContext(AnimeContext);
  const { isMobile, isTablet } = useScreenSize();

  const masonryColumns = useMemo(() => {
    if (isMobile) return 2;
    if (isTablet) return 4;
    return 5;
  }, [isMobile, isTablet]);

  const animeList = collections[params.collectionName];
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="back">
            <StyledArrowBack onClick={() => router.back()} />
          </IconButton>
          <StyledTitleContainer>
            <Typography fontWeight="bold">{params.collectionName}</Typography>
          </StyledTitleContainer>
        </Toolbar>
      </AppBar>

      <StyledContainer>
        <Masonry columns={masonryColumns} spacing={3}>
          {animeList?.map((anime) => (
            <AnimeCard showDeleteBtn key={anime.id} anime={anime} collectionName={params.collectionName} />
          ))}
        </Masonry>
      </StyledContainer>
    </>
  );
}
