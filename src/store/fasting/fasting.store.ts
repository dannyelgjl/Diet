import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  FastingSession,
  elapsedMs,
  remainingMs,
  dateKeyOf,
} from '../../utils/format';
import { useProtocolStore } from '../protocol/protocol.store';

import {
  notifyFastingStarted,
  notifyFastingFinishedNow,
  scheduleFastingFinished,
  cancelScheduled,
} from '../../services/notifications';
import { FastingState } from './types';

function uid(prefix = 'fs_') {
  return `${prefix}${Math.random().toString(16).slice(2)}_${Date.now().toString(
    16,
  )}`;
}

function upsertSession(list: FastingSession[], s: FastingSession) {
  const idx = list.findIndex(x => x.id === s.id);
  if (idx === -1) return [s, ...list];
  const next = list.slice();
  next[idx] = s;
  return next;
}

function notifIdForSession(sessionId: string) {
  return `fasting_end_${sessionId}`;
}

export const useFastingStore = create<FastingState>()(
  persist(
    (set, get) => ({
      current: null,
      sessionsByDate: {},

      async start() {
        const ps = useProtocolStore.getState();
        const protocol = ps.protocols.find(p => p.id === ps.selectedProtocolId);
        if (!protocol) throw new Error('Protocolo não encontrado');

        const cur = get().current;
        if (cur && (cur.status === 'running' || cur.status === 'paused')) {
          throw new Error('Já existe um jejum ativo');
        }

        const targetDurationMs = protocol.fastingHours * 60 * 60 * 1000;

        const now = new Date();
        const dateKey = dateKeyOf(now);

        const sessionId = uid();
        const notificationId = notifIdForSession(sessionId);

        const session: FastingSession = {
          id: sessionId,
          protocolId: protocol.id,
          targetDurationMs,
          startedAt: now.toISOString(),
          pausedAt: null,
          totalPausedMs: 0,
          finishedAt: null,
          status: 'running',
          notificationId,
        };

        const dayList = get().sessionsByDate[dateKey] ?? [];
        set({
          current: session,
          sessionsByDate: {
            ...get().sessionsByDate,
            [dateKey]: upsertSession(dayList, session),
          },
        });

        await notifyFastingStarted();

        const endAtMs = now.getTime() + targetDurationMs;
        await scheduleFastingFinished(endAtMs, notificationId);
      },

      async pause() {
        const cur = get().current;
        if (!cur || cur.status !== 'running') return;

        if (cur.notificationId) {
          await cancelScheduled(cur.notificationId);
        }

        const updated: FastingSession = {
          ...cur,
          pausedAt: new Date().toISOString(),
          status: 'paused',
        };

        const dateKey = dateKeyOf(new Date(cur.startedAt));
        const dayList = get().sessionsByDate[dateKey] ?? [];

        set({
          current: updated,
          sessionsByDate: {
            ...get().sessionsByDate,
            [dateKey]: upsertSession(dayList, updated),
          },
        });
      },

      async resume() {
        const cur = get().current;
        if (!cur || cur.status !== 'paused' || !cur.pausedAt) return;

        const nowMs = Date.now();
        const pausedAtMs = new Date(cur.pausedAt).getTime();
        const extraPaused = Math.max(0, nowMs - pausedAtMs);

        const updated: FastingSession = {
          ...cur,
          totalPausedMs: cur.totalPausedMs + extraPaused,
          pausedAt: null,
          status: 'running',
        };

        const dateKey = dateKeyOf(new Date(cur.startedAt));
        const dayList = get().sessionsByDate[dateKey] ?? [];

        set({
          current: updated,
          sessionsByDate: {
            ...get().sessionsByDate,
            [dateKey]: upsertSession(dayList, updated),
          },
        });

        if (updated.notificationId) {
          const remMs = remainingMs(updated, nowMs);
          const endAtMs = nowMs + remMs;
          await scheduleFastingFinished(endAtMs, updated.notificationId);
        }
      },

      async finish() {
        const cur = get().current;
        if (!cur || (cur.status !== 'running' && cur.status !== 'paused'))
          return;

        if (cur.notificationId) {
          await cancelScheduled(cur.notificationId);
        }

        const updated: FastingSession = {
          ...cur,
          finishedAt: new Date().toISOString(),
          status: 'finished',
          pausedAt: null,
        };

        const dateKey = dateKeyOf(new Date(cur.startedAt));
        const dayList = get().sessionsByDate[dateKey] ?? [];

        set({
          current: null,
          sessionsByDate: {
            ...get().sessionsByDate,
            [dateKey]: upsertSession(dayList, updated),
          },
        });

        await notifyFastingFinishedNow();
      },

      getElapsed(nowMs) {
        const cur = get().current;
        if (!cur) return 0;

        if (cur.status === 'finished' && cur.finishedAt) {
          return elapsedMs(cur, new Date(cur.finishedAt).getTime());
        }
        return elapsedMs(cur, nowMs);
      },

      getRemaining(nowMs) {
        const cur = get().current;
        if (!cur) return 0;
        if (cur.status === 'finished') return 0;
        return remainingMs(cur, nowMs);
      },

      getTotalFastingMsForDate(dateKey) {
        const list = get().sessionsByDate[dateKey] ?? [];
        const nowMs = Date.now();

        return list.reduce((sum, s) => {
          if (s.status === 'finished' && s.finishedAt) {
            const endMs = new Date(s.finishedAt).getTime();
            return sum + elapsedMs(s, endMs);
          }
          if (s.status === 'running' || s.status === 'paused') {
            return sum + elapsedMs(s, nowMs);
          }
          return sum;
        }, 0);
      },

      async syncAutoFinish() {
        const cur = get().current;
        if (!cur) return;
        if (cur.status === 'finished') return;
        if (cur.status === 'paused') return;

        const nowMs = Date.now();
        if (remainingMs(cur, nowMs) <= 0) {
          if (cur.notificationId) {
            await cancelScheduled(cur.notificationId);
          }

          const updated: FastingSession = {
            ...cur,
            finishedAt: new Date().toISOString(),
            status: 'finished',
            pausedAt: null,
          };

          const dateKey = dateKeyOf(new Date(cur.startedAt));
          const dayList = get().sessionsByDate[dateKey] ?? [];

          set({
            current: null,
            sessionsByDate: {
              ...get().sessionsByDate,
              [dateKey]: upsertSession(dayList, updated),
            },
          });
        }
      },
    }),
    {
      name: 'mamba-fasting',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      onRehydrateStorage: () => state => {
        state?.syncAutoFinish();
      },
    },
  ),
);
