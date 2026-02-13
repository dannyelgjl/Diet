import React from 'react';

import { formatDateKeyToBR, formatHMS } from '../../utils/format';

import * as S from './styles';
import { Header } from '../../components/Header';
import { useContainer } from './useContainer';
import { IHistoryProps } from './types';

export function HistoryScreen(props: IHistoryProps) {
  const { days, getSummary } = useContainer(props);

  return (
    <S.Container>
      <Header title="Histórico" showBack />

      <S.TitleContainer>
        <S.Title>Histórico</S.Title>
      </S.TitleContainer>

      {days.length === 0 ? (
        <S.EmptyText>
          Sem dados ainda. Registre refeições ou inicie um jejum.
        </S.EmptyText>
      ) : (
        <S.List
          data={days}
          keyExtractor={(k: string) => k}
          ItemSeparatorComponent={S.Separator}
          renderItem={({ item: dateKey }: { item: string }) => {
            const summary = getSummary(new Date(dateKey + 'T12:00:00'));

            return (
              <S.DayCard onPress={() => {}}>
                <S.DayTitle>{formatDateKeyToBR(dateKey)}</S.DayTitle>
                <S.RowText>Calorias: {summary.totalCalories} kcal</S.RowText>
                <S.RowText>
                  Jejum: {formatHMS(summary.totalFastingMs)}
                </S.RowText>
                <S.StatusText>
                  Status:{' '}
                  {summary.status === 'within' ? 'Dentro ✅' : 'Fora ⚠️'}
                </S.StatusText>
              </S.DayCard>
            );
          }}
        />
      )}
    </S.Container>
  );
}
