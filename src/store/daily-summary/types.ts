export type DailySummary = {
  dateKey: string;
  totalCalories: number;
  totalFastingMs: number;
  status: 'within' | 'out';
};

export type DailySummaryState = {
  getSummary(date?: Date): DailySummary;
};
