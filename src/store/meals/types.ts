export interface Meal {
  id: string;
  dateKey: string;
  name: string;
  calories: number;
  createdAt: string;
}

export type MealsState = {
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
