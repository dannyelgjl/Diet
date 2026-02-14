import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { Header } from '../../components/Header';
import * as S from './styles';
import { IWeeklyChart } from './types';
import { useContainer } from './useContainer';
import { ThemeToggle } from '../../components/ThemeToggle';

export function WeeklyChartScreen(props: IWeeklyChart) {
  const { axisColor, data, mode, setMode, labelColor } = useContainer(props);

  return (
    <S.Container>
      <Header title="Gráficos" showBack />

      <S.Content>
        <S.TitleContainer>
          <S.Title>Evolução semanal</S.Title>

          <ThemeToggle />
        </S.TitleContainer>

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
            data={data}
            barWidth={22}
            spacing={14}
            roundedTop
            yAxisThickness={0}
            xAxisThickness={1}
            xAxisColor={axisColor}
            rulesType="solid"
            rulesColor={axisColor}
            noOfSections={4}
            xAxisLabelTextStyle={{ color: labelColor }}
            yAxisTextStyle={{ color: labelColor }}
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
