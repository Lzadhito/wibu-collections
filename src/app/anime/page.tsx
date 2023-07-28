'use client';
import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Pagination, useMediaQuery } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

import type { GetAnimeListQuery } from '../graphql/types';
import type { AnimeListItem } from '../types/anime';

import GET_ANIME_LIST from '../graphql/getAnimeList';
import AnimeCard from './components/AnimeCard';
import AddToCollectionDialog from './components/AddToCollectionDialog';
import { txtAddToCollection, txtCancel, txtManage } from './locales';
import {
  StyledATCBtn,
  StyledATCBtnContainer,
  StyledHeader,
  StyledMain,
  StyledManageBtn,
  StyledPagination,
} from './styles';

export default function Home() {
  const [page, setPage] = useState(1);
  const [isManage, setIsManage] = useState(false);
  const [selectedManageData, setSelectedManageData] = useState<AnimeListItem[]>([]);
  const [showATCModal, setShowATCModal] = useState(false);

  const { data } = useSuspenseQuery<GetAnimeListQuery>(GET_ANIME_LIST, { variables: { page } });

  function handleClickAnimeCard(item: AnimeListItem) {
    if (selectedManageData.some((anime) => anime.id === item.id)) {
      setSelectedManageData(selectedManageData.filter((anime) => anime.id !== item.id));
    } else {
      setSelectedManageData([...selectedManageData, item]);
    }
  }

  function handleChangePagination(_: unknown, page: number) {
    setPage(page);
  }

  function resetMangedData() {
    setIsManage(false);
    setSelectedManageData([]);
  }

  function handleClickManage() {
    if (isManage) resetMangedData();
    else setIsManage(true);
  }

  function handleClickATC() {
    setShowATCModal(true);
  }

  function handleCloseATCModal() {
    setShowATCModal(false);
  }

  function handleSubmitAtcModal() {
    handleCloseATCModal();
    resetMangedData();
  }

  const isMobile = !useMediaQuery('(min-width:1024px)');
  const animeList = useMemo(() => data?.Page?.media, [data]);
  return (
    <>
      <div>
        <StyledMain>
          <StyledHeader>
            <StyledManageBtn variant={isManage ? 'outlined' : 'contained'} onClick={handleClickManage}>
              {isManage ? txtCancel : txtManage}
            </StyledManageBtn>
          </StyledHeader>
          {isMobile ? (
            <Masonry columns={2} spacing={3}>
              {animeList.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  showCheckbox={isManage}
                  checked={selectedManageData.some((item) => item.id === anime.id)}
                  onClick={handleClickAnimeCard}
                />
              ))}
            </Masonry>
          ) : (
            <div>show desktop version</div>
          )}
          <StyledPagination
            onChange={handleChangePagination}
            count={data?.Page?.pageInfo?.lastPage}
            page={data?.Page?.pageInfo?.currentPage}
            hidePrevButton={page === 1}
            hideNextButton={page === data?.Page?.pageInfo?.lastPage}
          />
        </StyledMain>
        {isManage && (
          <StyledATCBtnContainer>
            <StyledATCBtn
              disabled={selectedManageData.length < 1}
              onClick={handleClickATC}
              fullWidth
              variant="contained"
            >{`${txtAddToCollection}${
              selectedManageData.length > 1 ? ` (${selectedManageData.length})` : ''
            }`}</StyledATCBtn>
          </StyledATCBtnContainer>
        )}
      </div>
      {showATCModal && (
        <AddToCollectionDialog
          onSubmit={handleSubmitAtcModal}
          onClose={handleCloseATCModal}
          selectedManageData={selectedManageData}
        />
      )}
    </>
  );
}
