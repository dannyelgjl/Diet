import { useDailySummaryStore } from '../../../src/store/daily-summary/daily-summary.store';

jest.mock('../../../src/store/meals/meals.store', () => ({
  useMealsStore: {
    getState: () => ({
      getMeals: (dateKey: string) => {
        if (dateKey === '2026-02-13') {
          return [
            { id: '1', name: 'Lunch', calories: 500, createdAt: 'x' },
            { id: '2', name: 'Dinner', calories: 700, createdAt: 'x' },
          ];
        }
        return [];
      },
    }),
  },
}));

jest.mock('../../../src/store/fasting/fasting.store', () => ({
  useFastingStore: {
    getState: () => ({
      getTotalFastingMsForDate: (dateKey: string) => {
        if (dateKey === '2026-02-13') {
          return 16 * 60 * 60 * 1000;
        }
        return 0;
      },
    }),
  },
}));

jest.mock('../../../src/store/protocol/protocol.store', () => ({
  useProtocolStore: {
    getState: () => ({
      selectedProtocolId: 'p16',
      protocols: [{ id: 'p16', fastingHours: 16 }],
    }),
  },
}));

describe('useDailySummaryStore', () => {
  it('calculates totalCalories by summing the meals of the day', () => {
    const summary = useDailySummaryStore
      .getState()
      .getSummary(new Date('2026-02-13T12:00:00'));

    expect(summary.dateKey).toBe('2026-02-13');
    expect(summary.totalCalories).toBe(1200);
  });

  it('sets status to "within" when totalFastingMs >= selected protocol goalMs', () => {
    const summary = useDailySummaryStore
      .getState()
      .getSummary(new Date('2026-02-13T12:00:00'));

    expect(summary.totalFastingMs).toBe(16 * 60 * 60 * 1000);
    expect(summary.status).toBe('within');
  });

  it('sets status to "out" when totalFastingMs < goalMs', () => {
    const fasting = require('../../../src/store/fasting/fasting.store');

    jest.spyOn(fasting.useFastingStore, 'getState').mockReturnValueOnce({
      getTotalFastingMsForDate: () => 10 * 60 * 60 * 1000,
    });

    const summary = useDailySummaryStore
      .getState()
      .getSummary(new Date('2026-02-13T12:00:00'));

    expect(summary.status).toBe('out');
  });

  it('uses a 16h fallback when the selected protocol is not found', () => {
    const protocol = require('../../../src/store/protocol/protocol.store');

    jest.spyOn(protocol.useProtocolStore, 'getState').mockReturnValueOnce({
      selectedProtocolId: 'not-found',
      protocols: [],
    });

    const summary = useDailySummaryStore
      .getState()
      .getSummary(new Date('2026-02-13T12:00:00'));

    expect(summary.status).toBe('within');
  });
});
