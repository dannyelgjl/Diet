import React from 'react';
import { formatHMS } from '../../utils/format';

import * as S from './styles';
import { IFastingProps } from './types';
import { useContainer } from './useContainer';

export function FastingTimerCard(props: IFastingProps) {
  const {
    activeProtocol,
    canStartNew,
    current,
    elapsed,
    finish,
    pause,
    remaining,
    resume,
    start,
    startLabel,
    statusLabel,
  } = useContainer(props);

  return (
    <S.Container>
      <S.Title>Timer de Jejum</S.Title>

      {activeProtocol && (
        <S.ProtocolInfo>
          {activeProtocol.name} • Jejum {activeProtocol.fastingHours}h / Janela{' '}
          {activeProtocol.eatingHours}h
        </S.ProtocolInfo>
      )}

      {canStartNew ? (
        <>
          <S.Subtitle>{statusLabel}</S.Subtitle>

          <S.PrimaryButton onPress={start}>
            <S.PrimaryButtonText>{startLabel}</S.PrimaryButtonText>
          </S.PrimaryButton>
        </>
      ) : (
        <>
          <S.Subtitle>Status: {current?.status}</S.Subtitle>

          <S.Timer>{formatHMS(remaining)}</S.Timer>

          <S.Subtitle>Decorrido: {formatHMS(elapsed)}</S.Subtitle>

          {current?.status === 'running' && (
            <S.PrimaryButton onPress={pause}>
              <S.PrimaryButtonText>Pausar</S.PrimaryButtonText>
            </S.PrimaryButton>
          )}

          {current?.status === 'paused' && (
            <S.PrimaryButton onPress={resume}>
              <S.PrimaryButtonText>Retomar</S.PrimaryButtonText>
            </S.PrimaryButton>
          )}

          <S.OutlineButton onPress={finish}>
            <S.OutlineButtonText>Encerrar</S.OutlineButtonText>
          </S.OutlineButton>
        </>
      )}
    </S.Container>
  );
}
