import { useMemo, useState } from 'react';
import { IWeeklyChart } from './types';
import { getWeeklySeries } from '../../utils/format';
import { useTheme } from 'styled-components/native';

export const useContainer = (_: IWeeklyChart) => {
  const [mode, setMode] = useState<'calories' | 'fastingMs'>('calories');

  const series = useMemo(() => getWeeklySeries(mode), [mode]);

  const theme = useTheme();

  const barColor = theme.colors.secondary;
  const axisColor = theme.colors.border;
  const labelColor = theme.colors.mutedText;

  const chartData = useMemo(
    () =>
      series.map(p => ({
        value: p.value,
        label: p.label,
      })),
    [series],
  );

  const data = chartData.map(item => ({
    ...item,
    frontColor: barColor,
    labelTextStyle: { color: labelColor },
  }));
  return { chartData, mode, setMode, axisColor, data, labelColor };
};
