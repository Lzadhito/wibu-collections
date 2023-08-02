'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import AnimeCard from '@/app/anime/components/AnimeCard';
import { StyledArrowBack, StyledListContainer, StyledTitleContainer } from '@/app/anime/styles';
import { AnimeContext } from '@/context/AnimeContext';

import LazyRenameCollectionNameDialog from '../../components/RenameCollectionNameDialog/lazy';
import { StyledContainer, StyledEditIcon } from './styles';

interface PageProps {
  params: { collectionName: string };
}

export default function CollectionDetails({ params }: PageProps) {
  const collectionName = decodeURI(params.collectionName);
  const router = useRouter();
  const { collections } = useContext(AnimeContext);

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
          <IconButton onClick={() => setShowRenameDialog(true)} aria-label="edit">
            <StyledEditIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <StyledContainer>
        <StyledListContainer>
          {animeList?.map((anime) => (
            <AnimeCard showDeleteBtn key={anime.id} anime={anime} collectionName={collectionName} />
          ))}
        </StyledListContainer>
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
