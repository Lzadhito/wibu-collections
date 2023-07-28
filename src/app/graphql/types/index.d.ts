import { AnimeListItem } from '@/app/types/anime';

export interface GetAnimeListQuery {
  Page: {
    pageInfo: {
      total: number;
      lastPage: number;
      currentPage: number;
    };
    media: AnimeListItem[];
  };
}
