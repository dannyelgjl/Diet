import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { Header } from '../../components/Header';
import * as S from './styles';
import { IWeeklyChart } from './types';
import { useContainer } from './useContainer';

export function WeeklyChartScreen(props: IWeeklyChart) {
  const { chartData, mode, setMode } = useContainer(props);

  return (
    <S.Container>
      <Header title="Gráficos" showBack />

      <S.Content>
        <S.Title>Evolução semanal</S.Title>

        <S.ToggleRow>
          <S.ToggleButton
            onPress={() => setMode('calories')}
            $active={mode === 'calories'}
          >
            <S.ToggleText $active={mode === 'calories'}>Calorias</S.ToggleText>
          </S.ToggleButton>

          <S.ToggleButton
            onPress={() => setMode('fastingMs')}
            $active={mode === 'fastingMs'}
          >
            <S.ToggleText $active={mode === 'fastingMs'}>
              Jejum (h)
            </S.ToggleText>
          </S.ToggleButton>
        </S.ToggleRow>

        <S.ChartCard>
          <S.ChartTitle>
            {mode === 'calories'
              ? 'Calorias por dia'
              : 'Horas de jejum por dia'}
          </S.ChartTitle>

          <BarChart
            data={chartData}
            barWidth={22}
            spacing={14}
            roundedTop
            yAxisThickness={0}
            xAxisThickness={1}
            noOfSections={4}
            isAnimated
          />
        </S.ChartCard>

        <S.Footer>
          Últimos 7 dias • {mode === 'calories' ? 'kcal' : 'horas'}
        </S.Footer>
      </S.Content>
    </S.Container>
  );
}
