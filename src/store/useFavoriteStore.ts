import { STORAGE } from '@/constants';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set, get) => ({
      favorites: [],
      addFavorite: id => {
        set(state => ({ favorites: [...state.favorites, id] }));
        toast.success('Added to favorites');
      },
      removeFavorite: id => {
        set(state => ({
          favorites: state.favorites.filter(favorite => favorite !== id),
        }));
        toast.success('Removed from favorites');
      },
      isFavorite: id => get().favorites.includes(id),
    }),
    {
      name: STORAGE.FAVORITE,
    },
  ),
);
