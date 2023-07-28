'use client';

import type { AnimeCollectionRef, AnimeListItem } from '@/app/types/anime';

import deepCopy from '@/helpers/deepCopy';
import { LS_COLLECTIONS_KEY } from './constants';
import hasSpecialCharacters from './helpers/hasSpecialCharacters';
import { txtIsCollectionExist, txtIsCollectionNotExist, txtCollectionCannotContainSpecialChar } from './locales';
import usePersistentState from '../../hooks/usePersistentState';
import { PropsWithChildren, createContext } from 'react';

interface AnimeContextValues {
  collections: Record<string, AnimeListItem[]>;
  getAnime: (animeId: number) => AnimeCollectionRef | undefined;
  createCollection: (collectionName: string, values: AnimeListItem[]) => void;
  removeCollection: (collectionName: string) => void;
  editCollectionName: (collectionName: string, newCollectionName: string) => void;
  addToCollection: (animes: AnimeListItem[] | AnimeListItem, collectionName: string) => void;
  removeFromCollection: (animeId: number, collectionName: string) => void;
}
export const AnimeContext = createContext<AnimeContextValues>({
  collections: {},
  getAnime: (animeId: number) => undefined,
  createCollection: (collectionName: string, values: AnimeListItem[] = []) => {},
  removeCollection: (collectionName: string) => {},
  editCollectionName: (collectionName: string, newCollectionName: string) => {},
  addToCollection: (animes: AnimeListItem[] | AnimeListItem, collectionName: string) => {},
  removeFromCollection: (animeId: number, collectionName: string) => {},
});

export default function AnimeProvider({ children }: PropsWithChildren) {
  const [collections, setCollections] = usePersistentState({ defaultValue: {}, localStorageKey: LS_COLLECTIONS_KEY });

  function getAnime(animeId: number): AnimeCollectionRef | undefined {
    const collectionNames = Object.keys(collections);
    for (let i = 0; i < collectionNames.length; i++) {
      const collectionName = collectionNames[i];
      for (let j = 0; j < collections[collectionName].length; j++) {
        const anime = collections[collectionName][j];
        if (anime.id === animeId) return { collectionName, data: anime };
      }
    }

    return undefined;
  }

  function createCollection(collectionName: string, values: AnimeListItem[] = []): void {
    if (hasSpecialCharacters(collectionName)) throw new Error(txtCollectionCannotContainSpecialChar);
    if (collectionName in collections) throw new Error(txtIsCollectionExist);
    const newCollections = deepCopy(collections);
    newCollections[collectionName] = values;
    setCollections(newCollections);
  }

  function removeCollection(collectionName: string): void {
    if (!(collectionName in collections)) throw new Error(txtIsCollectionNotExist);
    const newCollections = deepCopy(collections);
    delete newCollections[collectionName];
    setCollections(newCollections);
  }

  function editCollectionName(collectionName: string, newCollectionName: string) {
    if (!(collectionName in collections)) throw new Error(txtIsCollectionNotExist);
    const newCollections = deepCopy(collections);
    const tempCollection = newCollections[collectionName];
    delete newCollections[collectionName];
    newCollections[newCollectionName] = tempCollection;
    setCollections(newCollections);
  }

  function addToCollection(animes: AnimeListItem[] | AnimeListItem, collectionName: string): void {
    if (!(collectionName in collections)) throw new Error(txtIsCollectionNotExist);
    const newCollections = deepCopy(collections);
    if (Array.isArray(animes)) newCollections[collectionName] = newCollections[collectionName].concat(animes);
    else newCollections[collectionName].push(animes);
    setCollections(newCollections);
  }

  function removeFromCollection(animeId: number, collectionName: string): void {
    if (!(collectionName in collections)) throw new Error(txtIsCollectionNotExist);
    const newCollections = deepCopy(collections);
    console.log(newCollections);
    newCollections[collectionName] = newCollections[collectionName].filter(
      (anime: AnimeListItem) => anime.id !== animeId
    );
    setCollections(newCollections);
  }

  return (
    <AnimeContext.Provider
      value={{
        collections,
        getAnime,
        createCollection,
        removeCollection,
        editCollectionName,
        addToCollection,
        removeFromCollection,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
}
