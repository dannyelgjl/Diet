import { create } from 'zustand';
import { useProtocolStore } from '../protocol/protocol.store';
import { useFastingStore } from '../fasting/fasting.store';
import { useMealsStore } from '../meals/meals.store';
import { dateKeyOf } from '../../utils/format';

export type DailySummary = {
  dateKey: string;
  totalCalories: number;
  totalFastingMs: number;
  status: 'within' | 'out';
};

type DailySummaryState = {
  getSummary(date?: Date): DailySummary;
};

export const useDailySummaryStore = create<DailySummaryState>(() => ({
  getSummary(date = new Date()) {
    const dateKey = dateKeyOf(date);

    const meals = useMealsStore.getState().getMeals(dateKey);
    const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

    const totalFastingMs = useFastingStore
      .getState()
      .getTotalFastingMsForDate(dateKey);

    const ps = useProtocolStore.getState();
    const p = ps.protocols.find(x => x.id === ps.selectedProtocolId);
    const goalMs = (p?.fastingHours ?? 16) * 60 * 60 * 1000;

    const status: 'within' | 'out' =
      totalFastingMs >= goalMs ? 'within' : 'out';

    return { dateKey, totalCalories, totalFastingMs, status };
  },
}));
