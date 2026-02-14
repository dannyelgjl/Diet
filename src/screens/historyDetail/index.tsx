import React from 'react';

import { Header } from '../../components/Header';
import { formatDateKeyToBR, formatHMS, elapsedMs } from '../../utils/format';

import * as S from './styles';
import { ThemeToggle } from '../../components/ThemeToggle';
import { IHistoryDetailProps } from './types';
import { useContainer } from './useContainer';

export function HistoryDetailScreen(props: IHistoryDetailProps) {
  const { meals, sessions, summary, dateKey } = useContainer(props);

  return (
    <S.Container>
      <Header title="Detalhe do dia" showBack />

      <S.Content>
        <S.TitleContainer>
          <S.Title>{formatDateKeyToBR(dateKey)}</S.Title>
          <ThemeToggle />
        </S.TitleContainer>

        <S.Card>
          <S.RowText>Total de calorias: {summary.totalCalories} kcal</S.RowText>
          <S.RowText>
            Jejum total: {formatHMS(summary.totalFastingMs)}
          </S.RowText>
          <S.RowText>
            Status: {summary.status === 'within' ? 'Dentro ✅' : 'Fora ⚠️'}
          </S.RowText>
        </S.Card>

        <S.SectionTitle>Refeições</S.SectionTitle>
        {meals.length === 0 ? (
          <S.EmptyText>Nenhuma refeição registrada.</S.EmptyText>
        ) : (
          meals.map(m => (
            <S.Item key={m.id}>
              <S.ItemTitle>{m.name}</S.ItemTitle>
              <S.ItemMeta>{m.calories} kcal</S.ItemMeta>
            </S.Item>
          ))
        )}

        <S.SectionTitle>Sessões de jejum</S.SectionTitle>
        {sessions.length === 0 ? (
          <S.EmptyText>Nenhuma sessão registrada.</S.EmptyText>
        ) : (
          sessions.map(s => {
            const endMs =
              s.status === 'finished' && s.finishedAt
                ? new Date(s.finishedAt).getTime()
                : Date.now();

            const fastingMs = elapsedMs(s, endMs);

            return (
              <S.Item key={s.id}>
                <S.ItemTitle>{s.status}</S.ItemTitle>
                <S.ItemMeta>
                  {'\n'}• Jejum: {formatHMS(fastingMs)} {'\n'}• Meta:{' '}
                  {formatHMS(s.targetDurationMs)}
                  {'\n'}• Pausado: {formatHMS(s.totalPausedMs)}
                </S.ItemMeta>
              </S.Item>
            );
          })
        )}
      </S.Content>
    </S.Container>
  );
}
