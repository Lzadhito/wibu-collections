'use client';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { StyledArrowBack } from '../styles';
import { StyledTitleContainer } from '../../styles';

interface PageProps {
  params: { collectionName: string };
}

export default function CollectionDetails({ params }: PageProps) {
  const router = useRouter();
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

      {params.collectionName}
    </>
  );
}
