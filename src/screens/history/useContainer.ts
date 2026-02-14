import { useNavigation } from '@react-navigation/native';
import { IHistoryProps } from './types';
import { useMealsStore } from '../../store/meals/meals.store';
import { useFastingStore } from '../../store/fasting/fasting.store';
import { useDailySummaryStore } from '../../store/daily-summary/daily-summary.store';
import { useMemo } from 'react';
import { RootStackParamList } from '../../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useContainer = (_: IHistoryProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mealsByDate = useMealsStore(state => state.mealsByDate);
  const sessionsByDate = useFastingStore(state => state.sessionsByDate);
  const getSummary = useDailySummaryStore(state => state.getSummary);

  const days = useMemo(() => {
    const keys = new Set<string>([
      ...Object.keys(mealsByDate),
      ...Object.keys(sessionsByDate),
    ]);

    return Array.from(keys).sort((a, b) => (a < b ? 1 : -1));
  }, [mealsByDate, sessionsByDate]);

  return { navigation, mealsByDate, sessionsByDate, getSummary, days };
};
