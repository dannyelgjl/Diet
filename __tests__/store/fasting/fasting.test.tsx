import { act } from '@testing-library/react-native';

jest.mock('../../../src/services/notifications', () => ({
  notifyFastingStarted: jest.fn(() => Promise.resolve()),
  notifyFastingFinishedNow: jest.fn(() => Promise.resolve()),
  scheduleFastingFinished: jest.fn(() => Promise.resolve()),
  cancelScheduled: jest.fn(() => Promise.resolve()),
}));

jest.mock('../../../src/store/protocol/protocol.store', () => ({
  useProtocolStore: {
    getState: jest.fn(() => ({
      selectedProtocolId: 'p16',
      protocols: [
        {
          id: 'p16',
          name: '16:8',
          fastingHours: 16,
          eatingHours: 8,
          isCustom: false,
        },
      ],
    })),
  },
}));

import {
  notifyFastingStarted,
  notifyFastingFinishedNow,
  scheduleFastingFinished,
  cancelScheduled,
} from '../../../src/services/notifications';

import { useFastingStore } from '../../../src/store/fasting/fasting.store';

describe('useFastingStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useFastingStore.setState({
      current: null,
      sessionsByDate: {},
    });

    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-13T10:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('start(): creates a running session, saves it in sessionsByDate and schedules a notification', async () => {
    await act(async () => {
      await useFastingStore.getState().start();
    });

    const state = useFastingStore.getState();
    expect(state.current).toBeTruthy();
    expect(state.current?.status).toBe('running');
    expect(state.current?.protocolId).toBe('p16');
    expect(state.current?.targetDurationMs).toBe(16 * 60 * 60 * 1000);
    expect(state.current?.notificationId).toMatch(/^fasting_end_/);

    const dateKey = '2026-02-13';
    expect(state.sessionsByDate[dateKey]).toHaveLength(1);

    expect(notifyFastingStarted).toHaveBeenCalledTimes(1);
    expect(scheduleFastingFinished).toHaveBeenCalledTimes(1);

    const [endAtMs, notifId] = (scheduleFastingFinished as jest.Mock).mock
      .calls[0];

    expect(notifId).toBe(state.current?.notificationId);
    expect(endAtMs).toBe(
      new Date('2026-02-13T10:00:00.000Z').getTime() + 16 * 60 * 60 * 1000,
    );
  });

  it('start(): does not allow starting when there is already a running fasting session', async () => {
    await act(async () => {
      await useFastingStore.getState().start();
    });

    await expect(useFastingStore.getState().start()).rejects.toThrow(
      'Já existe um jejum ativo',
    );
  });

  it('pause(): cancels the scheduled notification and changes status to paused', async () => {
    await act(async () => {
      await useFastingStore.getState().start();
    });

    const notifId = useFastingStore.getState().current?.notificationId!;
    expect(notifId).toBeTruthy();

    await act(async () => {
      await useFastingStore.getState().pause();
    });

    const state = useFastingStore.getState();
    expect(cancelScheduled).toHaveBeenCalledWith(notifId);
    expect(state.current?.status).toBe('paused');
    expect(state.current?.pausedAt).toBeTruthy();
  });

  it('resume(): adds paused time and reschedules notification with remaining time', async () => {
    await act(async () => {
      await useFastingStore.getState().start();
    });

    await act(async () => {
      await useFastingStore.getState().pause();
    });

    jest.setSystemTime(new Date('2026-02-13T10:30:00.000Z'));

    const before = useFastingStore.getState().current!;
    const notifId = before.notificationId!;

    await act(async () => {
      await useFastingStore.getState().resume();
    });

    const after = useFastingStore.getState().current!;
    expect(after.status).toBe('running');
    expect(after.pausedAt).toBeNull();
    expect(after.totalPausedMs).toBeGreaterThanOrEqual(30 * 60 * 1000);

    expect(scheduleFastingFinished).toHaveBeenCalledTimes(2);

    const lastCall = (scheduleFastingFinished as jest.Mock).mock.calls[
      (scheduleFastingFinished as jest.Mock).mock.calls.length - 1
    ];

    const [endAtMs, calledNotifId] = lastCall;

    expect(calledNotifId).toBe(notifId);
    expect(endAtMs).toBeGreaterThan(Date.now());
  });

  it('finish(): cancels notification, clears current, marks session as finished and notifies immediately', async () => {
    await act(async () => {
      await useFastingStore.getState().start();
    });

    const notifId = useFastingStore.getState().current?.notificationId!;
    const dateKey = '2026-02-13';

    await act(async () => {
      await useFastingStore.getState().finish();
    });

    const state = useFastingStore.getState();
    expect(cancelScheduled).toHaveBeenCalledWith(notifId);
    expect(state.current).toBeNull();

    const sessions = state.sessionsByDate[dateKey];
    expect(sessions).toHaveLength(1);
    expect(sessions[0].status).toBe('finished');
    expect(sessions[0].finishedAt).toBeTruthy();

    expect(notifyFastingFinishedNow).toHaveBeenCalledTimes(1);
  });

  it('syncAutoFinish(): when remaining <= 0, marks session as finished and clears current', async () => {
    await act(async () => {
      await useFastingStore.getState().start();
    });

    jest.setSystemTime(new Date('2026-02-14T02:00:01.000Z'));

    const notifId = useFastingStore.getState().current?.notificationId!;
    const dateKey = '2026-02-13';

    await act(async () => {
      await useFastingStore.getState().syncAutoFinish();
    });

    const state = useFastingStore.getState();
    expect(cancelScheduled).toHaveBeenCalledWith(notifId);
    expect(state.current).toBeNull();
    expect(state.sessionsByDate[dateKey][0].status).toBe('finished');
  });

  it('getElapsed(): when current is finished with finishedAt, calculates using finishedAt', () => {
    const startedAt = new Date('2026-02-13T10:00:00.000Z').toISOString();
    const finishedAt = new Date('2026-02-13T11:00:00.000Z').toISOString();

    useFastingStore.setState({
      current: {
        id: 'fs1',
        protocolId: 'p16',
        targetDurationMs: 16 * 60 * 60 * 1000,
        startedAt,
        pausedAt: null,
        totalPausedMs: 0,
        finishedAt,
        status: 'finished',
        notificationId: 'fasting_end_fs1',
      },
    } as any);

    const elapsed = useFastingStore
      .getState()
      .getElapsed(new Date('2026-02-13T20:00:00.000Z').getTime());

    expect(elapsed).toBe(60 * 60 * 1000);
  });

  it('getRemaining(): when current is finished, returns 0', () => {
    useFastingStore.setState({
      current: {
        id: 'fs2',
        protocolId: 'p16',
        targetDurationMs: 16 * 60 * 60 * 1000,
        startedAt: new Date('2026-02-13T10:00:00.000Z').toISOString(),
        pausedAt: null,
        totalPausedMs: 0,
        finishedAt: new Date('2026-02-13T12:00:00.000Z').toISOString(),
        status: 'finished',
        notificationId: 'fasting_end_fs2',
      },
    } as any);

    const remaining = useFastingStore.getState().getRemaining(Date.now());
    expect(remaining).toBe(0);
  });

  it('getTotalFastingMsForDate(): sums finished and running/paused sessions and ignores other statuses', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-13T12:00:00.000Z'));

    const dateKey = '2026-02-13';

    const finishedSession = {
      id: 's_finished',
      protocolId: 'p16',
      targetDurationMs: 16 * 60 * 60 * 1000,
      startedAt: new Date('2026-02-13T08:00:00.000Z').toISOString(),
      pausedAt: null,
      totalPausedMs: 0,
      finishedAt: new Date('2026-02-13T10:00:00.000Z').toISOString(),
      status: 'finished',
      notificationId: 'n1',
    };

    const runningSession = {
      id: 's_running',
      protocolId: 'p16',
      targetDurationMs: 16 * 60 * 60 * 1000,
      startedAt: new Date('2026-02-13T11:00:00.000Z').toISOString(),
      pausedAt: null,
      totalPausedMs: 0,
      finishedAt: null,
      status: 'running',
      notificationId: 'n2',
    };

    const idleSession = {
      id: 's_idle',
      protocolId: 'p16',
      targetDurationMs: 16 * 60 * 60 * 1000,
      startedAt: new Date('2026-02-13T07:00:00.000Z').toISOString(),
      pausedAt: null,
      totalPausedMs: 0,
      finishedAt: null,
      status: 'idle',
      notificationId: 'n3',
    };

    useFastingStore.setState({
      sessionsByDate: {
        [dateKey]: [finishedSession, runningSession, idleSession],
      },
    } as any);

    const total = useFastingStore.getState().getTotalFastingMsForDate(dateKey);

    expect(total).toBe(3 * 60 * 60 * 1000);
  });
});
