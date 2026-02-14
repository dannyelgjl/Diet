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
    it('formats milliseconds to HH:MM:SS', () => {
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;
      const oneSecond = 1000;

      const result = formatHMS(oneHour + oneMinute + oneSecond);

      expect(result).toBe('01:01:01');
    });

    it('returns 00:00:00 for 0', () => {
      expect(formatHMS(0)).toBe('00:00:00');
    });

    it('clamps negative to 00:00:00', () => {
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
    it('returns date key in yyyy-mm-dd format', () => {
      const date = new Date('2026-02-13T10:30:00.000Z');
      const result = dateKeyOf(date);

      expect(result).toBe('2026-02-13');
    });
  });

  describe('elapsedMs / remainingMs', () => {
    it('elapsedMs calcula tempo corrido sem pausas', () => {
      const session: FastingSession = {
        id: '1',
        protocolId: 'p',
        targetDurationMs: 10_000,
        startedAt: new Date(1000).toISOString(), // start=1000
        pausedAt: null,
        totalPausedMs: 0,
        finishedAt: null,
        status: 'running',
        notificationId: null,
      };

      // now = 6000 => running=5000
      expect(elapsedMs(session, 6000)).toBe(5000);
      expect(remainingMs(session, 6000)).toBe(5000);
    });

    it('elapsedMs desconta totalPausedMs e pausedAt (pausa ativa)', () => {
      const session: FastingSession = {
        id: '1',
        protocolId: 'p',
        targetDurationMs: 20_000,
        startedAt: new Date(1000).toISOString(), // start=1000
        pausedAt: new Date(4000).toISOString(), // paused at 4000
        totalPausedMs: 2000, // pausas anteriores acumuladas
        finishedAt: null,
        status: 'paused',
        notificationId: null,
      };

      // now = 9000:
      // runningMs = 9000-1000 = 8000
      // pausedExtra = 9000-4000 = 5000 (tempo desde que pausou agora)
      // elapsed = 8000 - 2000 - 5000 = 1000
      expect(elapsedMs(session, 9000)).toBe(1000);
      expect(remainingMs(session, 9000)).toBe(19_000);
    });

    it('elapsedMs nunca retorna negativo', () => {
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
    it('retorna 7 pontos com calories somadas + label dd/mm', () => {
      // fixa a data base do new Date() dentro do util
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-13T12:00:00.000Z'));

      // mock meals
      const getMeals = jest.fn((dateKey: string) => {
        if (dateKey === '2026-02-13')
          return [{ calories: 100 }, { calories: 200 }];
        if (dateKey === '2026-02-12') return [{ calories: 50 }];
        return [];
      });

      // mock fasting
      const getTotalFastingMsForDate = jest.fn(() => 0);

      useMealsStore.getState.mockReturnValue({ getMeals });
      useFastingStore.getState.mockReturnValue({ getTotalFastingMsForDate });

      const series = getWeeklySeries('calories');

      expect(series).toHaveLength(7);

      // primeiro ponto é 6 dias atrás (07/02) e último é hoje (13/02)
      expect(series[0].dateKey).toBe('2026-02-07');
      expect(series[0].label).toBe('07/02');

      const last = series[6];
      expect(last.dateKey).toBe('2026-02-13');
      expect(last.label).toBe('13/02');
      expect(last.value).toBe(300);

      const prev = series[5];
      expect(prev.dateKey).toBe('2026-02-12');
      expect(prev.value).toBe(50);

      // garante que chamou getMeals para cada um dos 7 dias
      expect(getMeals).toHaveBeenCalledTimes(7);
      expect(getTotalFastingMsForDate).toHaveBeenCalledTimes(7);
    });

    it('retorna fasting em horas arredondado 1 casa decimal quando kind=fastingMs', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-13T12:00:00.000Z'));

      const getMeals = jest.fn(() => []);

      // vamos controlar por dateKey pra provar o cálculo
      const fastingByDay: Record<string, number> = {
        '2026-02-13': 90 * 60 * 1000, // 1.5h
        '2026-02-12': 95 * 60 * 1000, // 1.5833h => 1.6 com 1 casa
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
