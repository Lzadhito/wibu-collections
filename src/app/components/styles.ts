import styled from '@emotion/styled';
import { Box, CircularProgress } from '@mui/material';

export const StyledForm = styled.form`
  width: 100%;
`;

export const StyledActionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  left: 0;
`;

export const StyledCircularProgressContainer = styled(Box)`
  position: relative;
`;

export const StyledCircularProgressLabelContainer = styled(Box)`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
