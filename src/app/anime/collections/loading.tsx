'use client';

import { Skeleton } from '@mui/material';
import { StyledLoadingContainer } from './styles';

export default function LoadingCollectionsPage() {
  return (
    <div>
      <Skeleton height={50} variant="rectangular" />
      <StyledLoadingContainer style={{ display: 'grid', gap: '1rem', marginTop: '50px' }}>
        {new Array(10).fill('').map((_, index) => (
          <Skeleton key={index} height={50} width="100%" variant="rectangular" />
        ))}
      </StyledLoadingContainer>
    </div>
  );
}
