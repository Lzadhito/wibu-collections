import { Button, CardContent, Pagination } from '@mui/material';
import styled from '@emotion/styled';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export const StyledListContainer = styled.div`
  display: grid;
  gap: 1rem;
  margin: 3rem 0;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 320px) and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StyledArrowBack = styled(ArrowBackRoundedIcon)`
  color: white;
`;
export const StyledCollectionIcon = styled(CollectionsBookmarkIcon)`
  color: white;
`;

export const StyledMain = styled.main`
  margin-bottom: 80px;
`;

export const StyledTitleContainer = styled.div`
  flex-grow: 1;
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

export const StyledManageBtn = styled(Button)`
  text-transform: capitalize;
`;

export const StyledATCBtnContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background-color: white;
  z-index: 3;

  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledATCBtn = styled(Button)`
  margin: 0 10px;
  text-transform: capitalize;
  font-weight: bold;
`;

export const StyledPagination = styled(Pagination)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledCardContentLoading = styled(CardContent)`
  padding-bottom: 50px;
`;
