import React from 'react';
import { renderWithTheme, fireEvent } from '../../testUtils/renderWithTheme';
import { useContainer } from '../../src/components/fasting/useContainer';
import { formatHMS } from '../../src/utils/format';
import { FastingTimerCard } from '../../src/components/Fasting';

jest.mock('../../src/components/fasting/useContainer', () => ({
  useContainer: jest.fn(),
}));

jest.mock('../../src/utils/format', () => ({
  formatHMS: jest.fn(),
}));

describe('FastingTimerCard', () => {
  const mockUseContainer = useContainer as jest.Mock;
  const mockFormatHMS = formatHMS as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatHMS.mockImplementation((ms: number) => `HMS(${ms})`);
  });

  function baseContainer(overrides: Partial<any> = {}) {
    return {
      activeProtocol: null,
      canStartNew: true,
      current: null,
      elapsed: 0,
      remaining: 0,
      start: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      finish: jest.fn(),
      startLabel: 'Iniciar',
      statusLabel: 'Nenhum jejum em andamento',
      ...overrides,
    };
  }

  it('render title and button to start when canStartNew=true', () => {
    const container = baseContainer({
      canStartNew: true,
      statusLabel: 'Nenhum jejum em andamento',
      startLabel: 'Iniciar',
    });
    mockUseContainer.mockReturnValue(container);

    const { getByText } = renderWithTheme((<FastingTimerCard />) as any);

    expect(getByText('Timer de Jejum')).toBeTruthy();
    expect(getByText('Nenhum jejum em andamento')).toBeTruthy();

    fireEvent.press(getByText('Iniciar'));
    expect(container.start).toHaveBeenCalledTimes(1);
  });

  it('show protocol active when display', () => {
    const container = baseContainer({
      activeProtocol: {
        id: 'p1',
        name: '16:8',
        fastingHours: 16,
        eatingHours: 8,
        isCustom: false,
      },
      canStartNew: true,
    });

    mockUseContainer.mockReturnValue(container);

    const { getByText } = renderWithTheme((<FastingTimerCard />) as any);

    expect(getByText('16:8 • Jejum 16h / Janela 8h')).toBeTruthy();
  });

  it('when in progress (running), show timer/elapsed and button Pause + Finish', () => {
    const container = baseContainer({
      canStartNew: false,
      current: { status: 'running' },
      remaining: 123,
      elapsed: 456,
    });

    mockUseContainer.mockReturnValue(container);

    const { getByText } = renderWithTheme((<FastingTimerCard />) as any);

    expect(getByText('Status: running')).toBeTruthy();
    expect(getByText('HMS(123)')).toBeTruthy();
    expect(getByText('Decorrido: HMS(456)')).toBeTruthy();

    fireEvent.press(getByText('Pausar'));
    expect(container.pause).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText('Encerrar'));
    expect(container.finish).toHaveBeenCalledTimes(1);

    expect(mockFormatHMS).toHaveBeenCalledWith(123);
    expect(mockFormatHMS).toHaveBeenCalledWith(456);
  });

  it('when pause (paused), show button Back + Finish', () => {
    const container = baseContainer({
      canStartNew: false,
      current: { status: 'paused' },
      remaining: 10,
      elapsed: 20,
    });

    mockUseContainer.mockReturnValue(container);

    const { getByText, queryByText } = renderWithTheme(
      (<FastingTimerCard />) as any,
    );

    expect(getByText('Status: paused')).toBeTruthy();
    expect(getByText('HMS(10)')).toBeTruthy();
    expect(getByText('Decorrido: HMS(20)')).toBeTruthy();

    expect(queryByText('Pausar')).toBeNull();

    fireEvent.press(getByText('Retomar'));
    expect(container.resume).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText('Encerrar'));
    expect(container.finish).toHaveBeenCalledTimes(1);
  });
});
