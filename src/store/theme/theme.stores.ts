// src/store/theme/theme.store.ts
import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'system',
  setMode: mode => set({ mode }),
  toggle: () => {
    const mode = get().mode;
    // se estiver system, começa indo pra dark (ou light, você decide)
    if (mode === 'system') return set({ mode: 'dark' });
    set({ mode: mode === 'dark' ? 'light' : 'dark' });
  },
}));
