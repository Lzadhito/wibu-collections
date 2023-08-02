'use client';

import { Skeleton } from '@mui/material';
import useScreenSize from '@/hooks/useScreenSize';
import { StyledContainer } from './styles';
import { StyledATCBtnContainer } from '../styles';

export default function LoadingAnimeDetailsPage() {
  const { isDesktop } = useScreenSize();

  return (
    <div>
      <Skeleton height={50} variant="rectangular" />
      <StyledContainer isDesktop={isDesktop}>
        <Skeleton width={375} height={563} variant="rectangular" />
        <Skeleton variant="text" height={50} width={300} />
        <Skeleton variant="text" height={10} width={200} />
        <Skeleton variant="text" height={100} width={550} />
        <Skeleton variant="text" height={100} width={550} />
        <Skeleton width={250} height={100} variant="rectangular" />
        <StyledATCBtnContainer>
          <Skeleton height={35} width="90%" variant="rounded" />
        </StyledATCBtnContainer>
      </StyledContainer>
    </div>
  );
}
