import { Button, Pagination } from '@mui/material';
import styled from '@emotion/styled';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export const StyledArrowBack = styled(ArrowBackRoundedIcon)`
  color: white;
`;
export const StyledCollectionIcon = styled(CollectionsBookmarkIcon)`
  color: white;
`;

export const StyledMain = styled.main`
  display: grid;
  justify-content: center;
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
