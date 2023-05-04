import { create } from 'zustand';

interface SearchStore {
  search: string;
  setSearch: (searchTerm: string) => void;
}

const useSearch = create<SearchStore>((set) => ({
  search: 'keyboard',
  setSearch: (searchTerm) => set({ search: searchTerm }),
}));

export default useSearch;
