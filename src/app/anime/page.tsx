'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';

import type { GetAnimeListQuery } from '../graphql/types';
import type { AnimeListItem } from '../types/anime';

import GET_ANIME_LIST from '../graphql/getAnimeList';
import AnimeCard from './components/AnimeCard';
import LazyAddToCollectionDialog from './components/AddToCollectionDialog/lazy';
import { txtAddToCollection, txtCancel, txtManage, txtTitle } from './locales';
import {
  StyledListContainer,
  StyledATCBtn,
  StyledATCBtnContainer,
  StyledCollectionIcon,
  StyledHeader,
  StyledMain,
  StyledManageBtn,
  StyledPagination,
  StyledTitleContainer,
} from './styles';

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get('page') || 0;
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
    router.push(pathname + '?' + `page=${page}`);
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

  const animeList = useMemo(() => data?.Page?.media, [data]);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <StyledTitleContainer>
            <Typography fontWeight="bold">{txtTitle}</Typography>
          </StyledTitleContainer>
          <Link href="/anime/collections" aria-label="navigate-collections">
            <IconButton aria-label="collection-icon" type="button">
              <StyledCollectionIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <StyledMain>
          <StyledHeader>
            <StyledManageBtn variant={isManage ? 'outlined' : 'contained'} onClick={handleClickManage}>
              {isManage ? txtCancel : txtManage}
            </StyledManageBtn>
          </StyledHeader>
          <StyledListContainer>
            {animeList.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                showCheckbox={isManage}
                checked={selectedManageData.some((item) => item.id === anime.id)}
                onClick={handleClickAnimeCard}
              />
            ))}
          </StyledListContainer>
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
      </Container>
      {showATCModal && (
        <LazyAddToCollectionDialog
          onSubmit={handleSubmitAtcModal}
          onClose={handleCloseATCModal}
          selectedAnime={selectedManageData}
        />
      )}
    </>
  );
}
