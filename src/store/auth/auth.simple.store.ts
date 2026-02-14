import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState } from './types';

const FIXED_EMAIL = 'email-teste@teste.com';
const FIXED_PASSWORD = '123456';

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      email: null,

      async login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();

        const ok =
          normalizedEmail === FIXED_EMAIL && password === FIXED_PASSWORD;

        if (!ok) {
          throw new Error('Email ou senha inválidos');
        }

        set({ isLoggedIn: true, email: FIXED_EMAIL });
      },

      async logout() {
        set({ isLoggedIn: false, email: null });
      },
    }),
    {
      name: 'mamba-auth',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
