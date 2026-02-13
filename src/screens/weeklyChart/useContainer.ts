import { useMemo, useState } from 'react';
import { IWeeklyChart } from './types';
import { getWeeklySeries } from '../../utils/format';

export const useContainer = (_: IWeeklyChart) => {
  const [mode, setMode] = useState<'calories' | 'fastingMs'>('calories');

  const series = useMemo(() => getWeeklySeries(mode), [mode]);

  const chartData = useMemo(
    () =>
      series.map(p => ({
        value: p.value,
        label: p.label,
      })),
    [series],
  );
  return { chartData, mode, setMode };
};
