import { useFastingStore } from '../store/fasting/fasting.store';
import { useMealsStore } from '../store/meals/meals.store';

export type FastingStatus = 'idle' | 'running' | 'paused' | 'finished';

export type FastingSession = {
  id: string;
  notificationId?: string | null;
  protocolId: string;
  targetDurationMs: number;

  startedAt: string;
  pausedAt: string | null;
  totalPausedMs: number;

  finishedAt: string | null;
  status: FastingStatus;
};

export function elapsedMs(session: FastingSession, nowMs: number) {
  const start = new Date(session.startedAt).getTime();
  const pausedAtMs = session.pausedAt
    ? new Date(session.pausedAt).getTime()
    : null;

  const runningMs = nowMs - start;
  const pausedExtra = pausedAtMs ? nowMs - pausedAtMs : 0;

  return Math.max(0, runningMs - session.totalPausedMs - pausedExtra);
}

export function remainingMs(session: FastingSession, nowMs: number) {
  return Math.max(0, session.targetDurationMs - elapsedMs(session, nowMs));
}

export function formatHMS(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function dateKeyOf(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export type WeeklyPoint = { label: string; value: number; dateKey: string };

function labelFromDateKey(dateKey: string) {
  const [y, m, d] = dateKey.split('-');
  return `${d}/${m}`;
}

export function getWeeklySeries(kind: 'calories' | 'fastingMs'): WeeklyPoint[] {
  const mealsState = useMealsStore.getState();
  const fastingState = useFastingStore.getState();

  const base = new Date();
  const out: WeeklyPoint[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);

    const dateKey = dateKeyOf(d);

    const calories = mealsState
      .getMeals(dateKey)
      .reduce((sum, m) => sum + m.calories, 0);

    const fastingMs = fastingState.getTotalFastingMsForDate(dateKey);

    out.push({
      dateKey,
      label: labelFromDateKey(dateKey),
      value:
        kind === 'calories'
          ? calories
          : Math.round((fastingMs / (60 * 60 * 1000)) * 10) / 10,
    });
  }

  return out;
}

export function formatDateKeyToBR(dateKey: string) {
  const [year, month, day] = dateKey.split('-');
  return `${day}/${month}/${year}`;
}
