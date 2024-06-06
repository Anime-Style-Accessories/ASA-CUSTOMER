import { create } from 'zustand';

interface SearchStore {
  keyword: string;
  onChange: (k: string) => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  keyword: '',
  onChange: (k: string) => {
    set({ keyword: k });
  },
}));
