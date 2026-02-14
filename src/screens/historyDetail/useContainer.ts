import { RouteProp, useRoute } from '@react-navigation/native';
import { IHistoryDetailProps, Params } from './types';
import { useMealsStore } from '../../store/meals/meals.store';
import { useFastingStore } from '../../store/fasting/fasting.store';
import { useDailySummaryStore } from '../../store/daily-summary/daily-summary.store';
import { useMemo } from 'react';

export const useContainer = (_: IHistoryDetailProps) => {
  const route = useRoute<RouteProp<Params, 'HistoryDetail'>>();
  const { dateKey } = route.params;

  const summary = useMemo(() => {
    return useDailySummaryStore
      .getState()
      .getSummary(new Date(dateKey + 'T12:00:00'));
  }, [dateKey]);

  const meals = useMealsStore.getState().getMeals(dateKey);
  const sessions = useFastingStore.getState().sessionsByDate[dateKey] ?? [];

  return { route, summary, meals, sessions, dateKey };
};
