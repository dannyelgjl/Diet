import { useTheme } from 'styled-components/native';
import { useThemeStore } from '../../store/theme/theme.stores';
import { IThemeToggleProps } from './types';

export const useContainer = (_: IThemeToggleProps) => {
  const mode = useThemeStore(state => state.mode);
  const toggle = useThemeStore(state => state.toggle);
  const theme = useTheme();

  const isDark = mode === 'dark';

  return { mode, toggle, theme, isDark };
};
