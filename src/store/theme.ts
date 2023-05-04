import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeStore {
  mode: 'light' | 'dark';
  font: 'sansSerif' | 'serif' | 'mono';
  setThemeMode: (mode: ThemeStore['mode']) => void;
  setThemeFont: (font: ThemeStore['font']) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      font: 'sansSerif',
      setThemeMode: (modeValue) => set({ mode: modeValue }),
      setThemeFont: (fontValue) => set({ font: fontValue }),
    }),
    { name: 'theme-store', storage: createJSONStorage(() => localStorage) }
  )
);
export default useThemeStore;
