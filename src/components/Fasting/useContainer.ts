import { useFastingStore } from '../../store/fasting/fasting.store';
import { useProtocolStore } from '../../store/protocol/protocol.store';
import { useEffect, useState } from 'react';
import { IFastingProps } from './types';

export const useContainer = (_: IFastingProps) => {
  const current = useFastingStore(state => state.current);
  const start = useFastingStore(state => state.start);
  const pause = useFastingStore(state => state.pause);
  const resume = useFastingStore(state => state.resume);
  const finish = useFastingStore(state => state.finish);
  const getElapsed = useFastingStore(state => state.getElapsed);
  const getRemaining = useFastingStore(state => state.getRemaining);
  const syncAutoFinish = useFastingStore(state => state.syncAutoFinish);

  const protocols = useProtocolStore(state => state.protocols);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    syncAutoFinish();
  }, [tick, syncAutoFinish]);

  const nowMs = Date.now();
  const elapsed = getElapsed(nowMs);
  const remaining = getRemaining(nowMs);

  const activeProtocol = current
    ? protocols.find(p => p.id === current.protocolId)
    : null;

  const canStartNew =
    !current || current.status === 'idle' || current.status === 'finished';

  const statusLabel =
    current?.status === 'finished'
      ? 'Jejum finalizado ✅'
      : 'Nenhum jejum em andamento';

  const startLabel =
    current?.status === 'finished' ? 'Iniciar novo jejum' : 'Iniciar';

  return {
    current,
    activeProtocol,
    canStartNew,
    statusLabel,
    startLabel,
    elapsed,
    remaining,
    start,
    pause,
    resume,
    finish,
  };
};
