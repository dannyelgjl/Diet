import React from 'react';
import { StatusBar } from 'react-native';

import * as S from './styles';
import { IHeaderProps } from './types';
import { useContainer } from './useContainer';

export function Header({
  title,
  showBack = false,
  rightLabel,
  onRightPress,
}: IHeaderProps) {
  const { navigation, topInset } = useContainer({
    title,
    onRightPress,
    rightLabel,
    showBack,
  });

  return (
    <S.Container $topInset={topInset}>
      <StatusBar barStyle="default" />

      <S.Row>
        {showBack ? (
          <S.LeftButton onPress={() => navigation.goBack()}>
            <S.LeftButtonText>Voltar</S.LeftButtonText>
          </S.LeftButton>
        ) : (
          <S.Spacer />
        )}

        <S.Title>{title}</S.Title>

        {rightLabel ? (
          <S.RightButton onPress={onRightPress}>
            <S.RightButtonText>{rightLabel}</S.RightButtonText>
          </S.RightButton>
        ) : (
          <S.Spacer />
        )}
      </S.Row>
    </S.Container>
  );
}
