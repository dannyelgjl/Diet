import {
  formatHMS,
  formatDateKeyToBR,
  dateKeyOf,
  getWeeklySeries,
  elapsedMs,
  remainingMs,
  type FastingSession,
} from '../../src/utils/format';

jest.mock('../../src/store/meals/meals.store', () => ({
  useMealsStore: {
    getState: jest.fn(),
  },
}));

jest.mock('../../src/store/fasting/fasting.store', () => ({
  useFastingStore: {
    getState: jest.fn(),
  },
}));

const { useMealsStore } = require('../../src/store/meals/meals.store');
const { useFastingStore } = require('../../src/store/fasting/fasting.store');

describe('format utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('formatHMS', () => {
    it('formats milliseconds into HH:MM:SS', () => {
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;
      const oneSecond = 1000;

      const result = formatHMS(oneHour + oneMinute + oneSecond);

      expect(result).toBe('01:01:01');
    });

    it('returns 00:00:00 when value is zero', () => {
      expect(formatHMS(0)).toBe('00:00:00');
    });

    it('clamps negative values to 00:00:00', () => {
      expect(formatHMS(-1000)).toBe('00:00:00');
    });
  });

  describe('formatDateKeyToBR', () => {
    it('converts yyyy-mm-dd to dd/mm/yyyy', () => {
      const result = formatDateKeyToBR('2026-02-13');
      expect(result).toBe('13/02/2026');
    });
  });

  describe('dateKeyOf', () => {
    it('returns a date key in yyyy-mm-dd format', () => {
      const date = new Date('2026-02-13T10:30:00.000Z');
      const result = dateKeyOf(date);

      expect(result).toBe('2026-02-13');
    });
  });

  describe('elapsedMs / remainingMs', () => {
    it('calculates elapsed time without pauses', () => {
      const session: FastingSession = {
        id: '1',
        protocolId: 'p',
        targetDurationMs: 10_000,
        startedAt: new Date(1000).toISOString(),
        pausedAt: null,
        totalPausedMs: 0,
        finishedAt: null,
        status: 'running',
        notificationId: null,
      };

      expect(elapsedMs(session, 6000)).toBe(5000);
      expect(remainingMs(session, 6000)).toBe(5000);
    });

    it('subtracts totalPausedMs and active pausedAt time', () => {
      const session: FastingSession = {
        id: '1',
        protocolId: 'p',
        targetDurationMs: 20_000,
        startedAt: new Date(1000).toISOString(),
        pausedAt: new Date(4000).toISOString(),
        totalPausedMs: 2000,
        finishedAt: null,
        status: 'paused',
        notificationId: null,
      };

      expect(elapsedMs(session, 9000)).toBe(1000);
      expect(remainingMs(session, 9000)).toBe(19_000);
    });

    it('never returns negative elapsed time', () => {
      const session: FastingSession = {
        id: '1',
        protocolId: 'p',
        targetDurationMs: 1000,
        startedAt: new Date(1000).toISOString(),
        pausedAt: new Date(2000).toISOString(),
        totalPausedMs: 999999,
        finishedAt: null,
        status: 'paused',
        notificationId: null,
      };

      expect(elapsedMs(session, 3000)).toBe(0);
      expect(remainingMs(session, 3000)).toBe(1000);
    });
  });

  describe('getWeeklySeries', () => {
    it('returns 7 points with summed calories and dd/mm labels', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-13T12:00:00.000Z'));

      const getMeals = jest.fn((dateKey: string) => {
        if (dateKey === '2026-02-13')
          return [{ calories: 100 }, { calories: 200 }];
        if (dateKey === '2026-02-12') return [{ calories: 50 }];
        return [];
      });

      const getTotalFastingMsForDate = jest.fn(() => 0);

      useMealsStore.getState.mockReturnValue({ getMeals });
      useFastingStore.getState.mockReturnValue({ getTotalFastingMsForDate });

      const series = getWeeklySeries('calories');

      expect(series).toHaveLength(7);

      expect(series[0].dateKey).toBe('2026-02-07');
      expect(series[0].label).toBe('07/02');

      const last = series[6];
      expect(last.dateKey).toBe('2026-02-13');
      expect(last.label).toBe('13/02');
      expect(last.value).toBe(300);

      const prev = series[5];
      expect(prev.dateKey).toBe('2026-02-12');
      expect(prev.value).toBe(50);

      expect(getMeals).toHaveBeenCalledTimes(7);
      expect(getTotalFastingMsForDate).toHaveBeenCalledTimes(7);
    });

    it('returns fasting hours rounded to one decimal when kind=fastingMs', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-13T12:00:00.000Z'));

      const getMeals = jest.fn(() => []);

      const fastingByDay: Record<string, number> = {
        '2026-02-13': 90 * 60 * 1000,
        '2026-02-12': 95 * 60 * 1000,
      };

      const getTotalFastingMsForDate = jest.fn((dateKey: string) => {
        return fastingByDay[dateKey] ?? 0;
      });

      useMealsStore.getState.mockReturnValue({ getMeals });
      useFastingStore.getState.mockReturnValue({ getTotalFastingMsForDate });

      const series = getWeeklySeries('fastingMs');

      const last = series[6];
      expect(last.dateKey).toBe('2026-02-13');
      expect(last.value).toBe(1.5);

      const prev = series[5];
      expect(prev.dateKey).toBe('2026-02-12');
      expect(prev.value).toBe(1.6);
    });
  });
});
