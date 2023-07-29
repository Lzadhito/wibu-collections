'use client';

import CollectionPreviewList from '@/app/components/CollectionPreviewList';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { StyledArrowBack, StyledTitleContainer } from '../styles';
import { txtCollections } from './locales';

export default function AnimeCollections() {
  const router = useRouter();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="back">
            <StyledArrowBack onClick={() => router.back()} />
          </IconButton>
          <StyledTitleContainer>
            <Typography fontWeight="bold">{txtCollections}</Typography>
          </StyledTitleContainer>
        </Toolbar>
      </AppBar>
      <Container>
        <CollectionPreviewList
          showActions
          onClickCollection={(collectionName) => router.push(`/anime/collections/${collectionName}`)}
        />
      </Container>
    </>
  );
}
