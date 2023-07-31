'use client';
import { useContext, useState } from 'react';
import { Masonry } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import AnimeCard from '@/app/anime/components/AnimeCard';
import { StyledArrowBack, StyledTitleContainer } from '@/app/anime/styles';
import { AnimeContext } from '@/context/AnimeContext';

import LazyRenameCollectionNameDialog from '../../components/RenameCollectionNameDialog/lazy';
import useMasonryColumns from '../../hooks/useMasonryColumns';
import { StyledContainer, StyledEditIcon } from './styles';

interface PageProps {
  params: { collectionName: string };
}

export default function CollectionDetails({ params }: PageProps) {
  const collectionName = decodeURI(params.collectionName);
  const router = useRouter();
  const { collections } = useContext(AnimeContext);
  const masonryColumns = useMasonryColumns();

  const [showRenameDialog, setShowRenameDialog] = useState(false);

  function handleSubmitRename(newCollectionName: string) {
    router.replace(`/anime/collections/${newCollectionName}`);
  }

  const animeList = collections[collectionName];
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="back">
            <StyledArrowBack onClick={() => router.back()} />
          </IconButton>
          <StyledTitleContainer>
            <Typography fontWeight="bold">{collectionName}</Typography>
          </StyledTitleContainer>
          <IconButton onClick={() => setShowRenameDialog(true)}>
            <StyledEditIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <StyledContainer>
        <Masonry columns={masonryColumns} spacing={3}>
          {animeList?.map((anime) => (
            <AnimeCard showDeleteBtn key={anime.id} anime={anime} collectionName={collectionName} />
          ))}
        </Masonry>
      </StyledContainer>
      {showRenameDialog && (
        <LazyRenameCollectionNameDialog
          collectionName={collectionName}
          onClose={() => setShowRenameDialog(false)}
          onSubmit={handleSubmitRename}
        />
      )}
    </>
  );
}
