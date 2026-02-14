import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { theme } from '../src/styles/theme/theme';

//
// const theme = {
//   fonts: {
//     Roboto_700Bold: 'Roboto-Bold',
//     Roboto_500Medium: 'Roboto-Medium',
//     Roboto_400Regular: 'Roboto-Regular',
//   },
//   colors: {
//     background: '#fff',
//     text: '#111',
//   },
// };

type Options = Omit<RenderOptions, 'wrapper'> & {
  themeOverride?: any;
};

export function renderWithTheme(
  ui: React.ReactElement,
  { themeOverride, ...options }: Options = {},
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={themeOverride ?? theme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react-native';
