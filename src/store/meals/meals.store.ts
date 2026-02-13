import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Meal = {
  id: string;
  dateKey: string;
  name: string;
  calories: number;
  createdAt: string;
};

type MealsState = {
  mealsByDate: Record<string, Meal[]>;

  addMeal(name: string, calories: number, date?: Date): void;
  editMeal(
    mealId: string,
    patch: Partial<Pick<Meal, 'name' | 'calories'>>,
    dateKey?: string,
  ): void;
  deleteMeal(mealId: string, dateKey?: string): void;

  getMeals(dateKey: string): Meal[];
  getTodayKey(): string;
};

function uid(prefix = 'm_') {
  return `${prefix}${Math.random().toString(16).slice(2)}_${Date.now().toString(
    16,
  )}`;
}

function dateKeyOf(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function normalizeName(s: string) {
  return s.trim();
}

export const useMealsStore = create<MealsState>()(
  persist(
    (set, get) => ({
      mealsByDate: {},

      addMeal(name, calories, date = new Date()) {
        const n = normalizeName(name);
        const c = Number(calories);

        if (!n) throw new Error('Nome é obrigatório');
        if (!Number.isFinite(c) || c <= 0)
          throw new Error('Calorias inválidas');

        const dateKey = dateKeyOf(date);

        const meal: Meal = {
          id: uid(),
          dateKey,
          name: n,
          calories: Math.floor(c),
          createdAt: new Date().toISOString(),
        };

        const list = get().mealsByDate[dateKey] ?? [];
        set({
          mealsByDate: {
            ...get().mealsByDate,
            [dateKey]: [meal, ...list],
          },
        });
      },

      editMeal(mealId, patch, dateKey) {
        const key = dateKey ?? get().getTodayKey();
        const list = get().mealsByDate[key] ?? [];

        const next = list.map(m => {
          if (m.id !== mealId) return m;
          return {
            ...m,
            name: patch.name !== undefined ? normalizeName(patch.name) : m.name,
            calories:
              patch.calories !== undefined
                ? Math.floor(Number(patch.calories))
                : m.calories,
          };
        });

        set({ mealsByDate: { ...get().mealsByDate, [key]: next } });
      },

      deleteMeal(mealId, dateKey) {
        const key = dateKey ?? get().getTodayKey();
        const list = get().mealsByDate[key] ?? [];
        set({
          mealsByDate: {
            ...get().mealsByDate,
            [key]: list.filter(m => m.id !== mealId),
          },
        });
      },

      getMeals(dateKey) {
        return get().mealsByDate[dateKey] ?? [];
      },

      getTodayKey() {
        return dateKeyOf(new Date());
      },
    }),
    {
      name: 'mamba-meals',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
