'use client';

import { Card, CardMedia, Container, Skeleton } from '@mui/material';
import { StyledHeader, StyledListContainer, StyledCardContentLoading } from './styles';

export default function LoadingAnimeListPage() {
  return (
    <div>
      <Skeleton height={50} variant="rectangular" />
      <Container>
        <StyledHeader>
          <Skeleton height={40} width={100} variant="rounded" />
        </StyledHeader>
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
