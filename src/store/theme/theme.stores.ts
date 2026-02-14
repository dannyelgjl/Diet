import { create } from 'zustand';
import { ThemeState } from './types';

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'system',
  setMode: mode => set({ mode }),
  toggle: () => {
    const mode = get().mode;

    if (mode === 'system') return set({ mode: 'dark' });
    set({ mode: mode === 'dark' ? 'light' : 'dark' });
  },
}));
