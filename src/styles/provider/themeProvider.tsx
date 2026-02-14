import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from '../theme/light';
import { darkTheme } from '../theme/dark';
import { useThemeStore } from '../../store/theme/theme.stores';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const mode = useThemeStore(s => s.mode);

  const theme = useMemo(() => {
    const effective = mode === 'system' ? scheme : mode;
    return effective === 'dark' ? darkTheme : lightTheme;
  }, [mode, scheme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
