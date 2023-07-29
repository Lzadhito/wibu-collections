'use client';

import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { StyledArrowBack, StyledTitleContainer } from '../styles';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AnimeDetails({ params }: PageProps) {
  const router = useRouter();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="back">
            <StyledArrowBack onClick={() => router.back()} />
          </IconButton>
          <StyledTitleContainer>
            <Typography fontWeight="bold">{params.id}</Typography>
          </StyledTitleContainer>
        </Toolbar>
      </AppBar>
      <Container>{params.id}</Container>
    </>
  );
}
