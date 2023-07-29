'use client';

import type { AnimeListItem } from '@/app/types/anime';

import deepCopy from '@/helpers/deepCopy';
import { LS_COLLECTIONS_KEY } from './constants';
import hasSpecialCharacters from './helpers/hasSpecialCharacters';
import { txtIsCollectionExist, txtIsCollectionNotExist, txtCollectionCannotContainSpecialChar } from './locales';
import usePersistentState from '../../hooks/usePersistentState';
import { PropsWithChildren, createContext } from 'react';

interface AnimeContextValues {
  collections: Record<string, AnimeListItem[]>;
  getCollectionsById: (animeId: number) => string[];
  createCollection: (collectionName: string) => void;
  removeCollection: (collectionName: string) => void;
  editCollectionName: (collectionName: string, newCollectionName: string) => void;
  addToCollection: (animes: AnimeListItem[] | AnimeListItem, collectionName: string) => void;
  removeFromCollection: (animeId: number, collectionName: string) => void;
}
export const AnimeContext = createContext<AnimeContextValues>({
  collections: {},
  getCollectionsById: (animeId: number) => [],
  createCollection: (collectionName: string) => {},
  removeCollection: (collectionName: string) => {},
  editCollectionName: (collectionName: string, newCollectionName: string) => {},
  addToCollection: (animes: AnimeListItem[] | AnimeListItem, collectionName: string) => {},
  removeFromCollection: (animeId: number, collectionName: string) => {},
});

export default function AnimeProvider({ children }: PropsWithChildren) {
  const [collections, setCollections] = usePersistentState({
    defaultValue: {},
    localStorageKey: LS_COLLECTIONS_KEY,
  });

  function getCollectionsById(animeId: number): string[] {
    const collectionNames = Object.keys(collections);
    const result: string[] = [];

    collectionNames.forEach((collectionName: string) => {
      if (collections[collectionName].some((anime: AnimeListItem) => anime.id === animeId)) {
        result.push(collectionName);
      }
    });

    return result;
  }

  function createCollection(collectionName: string): void {
    if (hasSpecialCharacters(collectionName)) throw new Error(txtCollectionCannotContainSpecialChar);
    if (collectionName in collections) throw new Error(txtIsCollectionExist);
    const newCollections = deepCopy(collections);
    newCollections[collectionName] = [];
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
    if (hasSpecialCharacters(collectionName)) throw new Error(txtCollectionCannotContainSpecialChar);

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
    newCollections[collectionName] = newCollections[collectionName].filter(
      (anime: AnimeListItem) => anime.id !== animeId
    );
    setCollections(newCollections);
  }

  return (
    <AnimeContext.Provider
      value={{
        collections,
        getCollectionsById,
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
