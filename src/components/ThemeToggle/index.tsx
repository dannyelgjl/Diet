import React from 'react';
import { Switch } from 'react-native';
import { useContainer } from './useContainer';
import { IThemeToggleProps } from './types';
import * as S from './styles';

export function ThemeToggle(props: IThemeToggleProps) {
  const { isDark, theme, toggle, mode } = useContainer(props);

  return (
    <S.Container>
      <S.TextMode>{mode === 'dark' ? '🌙' : '☀️'}</S.TextMode>
      <Switch
        value={isDark}
        onValueChange={toggle}
        trackColor={{ false: theme.colors.border, true: theme.colors.border }}
        thumbColor={isDark ? theme.colors.secondary : theme.colors.primary}
      />
    </S.Container>
  );
}
