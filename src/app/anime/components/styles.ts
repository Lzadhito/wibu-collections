import styled from '@emotion/styled';
import { Button, Card, CardMedia, Checkbox } from '@mui/material';
import type { CardMediaProps } from '@mui/material';

export const StyledCard = styled(Card)`
  position: relative;
  cursor: pointer;
`;

export const StyledDeleteBtn = styled(Button)`
  text-transform: capitalize;
  font-weight: bold;
`;

interface StyledCardMediaProps extends CardMediaProps {
  showCheckbox: boolean;
}
export const StyledCardMedia = styled(CardMedia)<StyledCardMediaProps>`
  object-fit: cover;
  aspect-ratio: 1/1;

  ${(props) =>
    props.showCheckbox &&
    `
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  `}
`;

export const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  * {
    color: white !important;
  }
`;
