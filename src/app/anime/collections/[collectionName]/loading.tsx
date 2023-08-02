'use client';

import { Card, CardMedia, Container, Skeleton } from '@mui/material';
import { StyledListContainer, StyledCardContentLoading } from '@/app/anime/styles';

export default function LoadingCollectionDetailsPage() {
  return (
    <div>
      <Skeleton height={50} variant="rectangular" />
      <Container>
        <StyledListContainer>
          {new Array(10).fill('').map((_, index) => (
            <Card key={index}>
              <CardMedia>
                <Skeleton height={200} variant="rectangular" />
              </CardMedia>
              <StyledCardContentLoading>
                <Skeleton variant="text" height={10} />
              </StyledCardContentLoading>
            </Card>
          ))}
        </StyledListContainer>
      </Container>
    </div>
  );
}
