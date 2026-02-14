import type { Theme } from './types';

export const lightTheme: Theme = {
  colors: {
    textDefault: '#343A40',
    transparent: 'transparent',

    primary: '#FFFFFF',
    secondary: '#000000',

    backgroundCard: '#FFFFFF',

    background: '#F5F5F5',
    card: '#FFFFFF',
    border: '#E9ECEF',
    mutedText: '#6C757D',
    danger: '#DC3545',
  },
  fonts: {
    Roboto_400Regular: 'Roboto-Regular',
    Roboto_600SemiBold: 'Roboto-SemiBold',
    Roboto_700Bold: 'Roboto-Bold',
  },
} as const;

export type TTheme = typeof lightTheme;
export type TColorsType = keyof typeof lightTheme.colors;
