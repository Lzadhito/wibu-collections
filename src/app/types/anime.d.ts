export interface AnimeDetails {
  id: number;
  title: {
    english: string;
    native: string;
  };
  coverImage: {
    large: string;
  };
  description: string;
  episodes: number;
  genres: string[];
  averageScore: number;
}

export type AnimeListItem = Omit<AnimeDetails, 'description' | 'episodes' | 'genres' | 'averageScore'>;

export interface AnimeCollectionRef {
  collectionName: string;
  data: AnimeListItem;
}
