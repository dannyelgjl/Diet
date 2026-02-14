import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { lightTheme } from '../src/styles/theme/light';

type Options = Omit<RenderOptions, 'wrapper'> & {
  themeOverride?: any;
};

export function renderWithTheme(
  ui: React.ReactElement,
  { themeOverride, ...options }: Options = {},
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={themeOverride ?? lightTheme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react-native';
