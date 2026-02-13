export const theme = {
  colors: {
    textDefault: '#343A40',
    transparent: 'transparent',

    primaryWhite: '#FFFFFF',
    primaryBlack: '#000000',
  },
  fonts: {
    Roboto_400Regular: 'Roboto-Regular',
    Roboto_600SemiBold: 'Roboto-SemiBold',
    Roboto_700Bold: 'Roboto-Bold',
  },
};

type TColorsType = keyof typeof theme.colors;
export type TTheme = typeof theme;

export type { TColorsType };
