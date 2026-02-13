import React from 'react';
import { formatDateKeyToBR, formatHMS } from '../../utils/format';
import * as S from './styles';
import { IDailySummaryCardProps } from './types';
import { useContainer } from './useContainer';

export function DailySummaryCard(props: IDailySummaryCardProps) {
  const { summary } = useContainer(props);
  return (
    <S.Container>
      <S.Title>Resumo do dia</S.Title>
      <S.Subtitle>{formatDateKeyToBR(summary.dateKey)}</S.Subtitle>

      <S.RowText>Total de calorias: {summary.totalCalories} kcal</S.RowText>
      <S.RowText>
        Tempo total de jejum: {formatHMS(summary.totalFastingMs)}
      </S.RowText>

      <S.StatusText>
        Status:{' '}
        <S.StatusValue $within={summary.status === 'within'}>
          {summary.status === 'within'
            ? 'Dentro da meta ✅'
            : 'Fora da meta ⚠️'}
        </S.StatusValue>
      </S.StatusText>
    </S.Container>
  );
}
