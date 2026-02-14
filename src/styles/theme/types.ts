export type Theme = {
  colors: {
    textDefault: string;
    transparent: string;

    primary: string;
    secondary: string;
    backgroundCard: string;

    background: string;
    card: string;
    border: string;
    mutedText: string;
    danger: string;
  };
  fonts: {
    Roboto_400Regular: string;
    Roboto_600SemiBold: string;
    Roboto_700Bold: string;
  };
};

export type TColorsType = keyof Theme['colors'];
