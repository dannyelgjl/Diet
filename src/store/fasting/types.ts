import { FastingSession } from '../../utils/format';

export type FastingState = {
  current: FastingSession | null;
  sessionsByDate: Record<string, FastingSession[]>;

  start(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  finish(): Promise<void>;

  getElapsed(nowMs: number): number;
  getRemaining(nowMs: number): number;

  getTotalFastingMsForDate(dateKey: string): number;

  syncAutoFinish(): Promise<void>;
};
