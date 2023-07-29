import styled from '@emotion/styled';
import { Container } from '@mui/material';
import type { ContainerProps } from '@mui/material';

interface StyledContainerProps extends ContainerProps {
  isDesktop: boolean;
}
export const StyledContainer = styled(Container)<StyledContainerProps>`
  margin-top: 1rem;
  margin-bottom: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

export const StyledRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  gap: 1rem;

  display: flex;
  flex-wrap: wrap;
`;
