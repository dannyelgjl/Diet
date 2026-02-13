import { useDailySummaryStore } from '../../store/daily-summary/daily-summary.store';
import { useFastingStore } from '../../store/fasting/fasting.store';
import { useEffect, useState } from 'react';
import { IDailySummaryCardProps } from './types';

export const useContainer = (_: IDailySummaryCardProps) => {
  const getSummary = useDailySummaryStore(state => state.getSummary);
  const syncAutoFinish = useFastingStore(state => state.syncAutoFinish);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    syncAutoFinish();
  }, [tick, syncAutoFinish]);

  const summary = getSummary();

  return { getSummary, summary };
};
