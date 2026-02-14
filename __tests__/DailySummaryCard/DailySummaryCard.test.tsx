import React from 'react';
import { DailySummaryCard } from '../../src/components/DailySummaryCard';
import { renderWithTheme } from '../../testUtils/renderWithTheme';

jest.mock('../../src/components/DailySummaryCard/useContainer', () => ({
  useContainer: jest.fn(),
}));

jest.mock('../../src/utils/format', () => ({
  formatDateKeyToBR: jest.fn(),
  formatHMS: jest.fn(),
}));

import { useContainer } from '../../src/components/DailySummaryCard/useContainer';
import { formatDateKeyToBR, formatHMS } from '../../src/utils/format';

describe('DailySummaryCard', () => {
  const mockUseContainer = useContainer as jest.Mock;
  const mockFormatDateKeyToBR = formatDateKeyToBR as jest.Mock;
  const mockFormatHMS = formatHMS as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render resume with status "within"', () => {
    mockUseContainer.mockReturnValue({
      summary: {
        dateKey: '2026-02-13',
        totalCalories: 1500,
        totalFastingMs: 16 * 60 * 60 * 1000,
        status: 'within',
      },
    });

    mockFormatDateKeyToBR.mockReturnValue('13/02/2026');
    mockFormatHMS.mockReturnValue('16:00:00');

    const { getByText } = renderWithTheme((<DailySummaryCard />) as any);

    expect(getByText('Resumo do dia')).toBeTruthy();
    expect(getByText('13/02/2026')).toBeTruthy();

    expect(getByText('Total de calorias: 1500 kcal')).toBeTruthy();
    expect(getByText('Tempo total de jejum: 16:00:00')).toBeTruthy();

    expect(getByText('Dentro da meta ✅')).toBeTruthy();

    expect(mockFormatDateKeyToBR).toHaveBeenCalledWith('2026-02-13');
    expect(mockFormatHMS).toHaveBeenCalledWith(16 * 60 * 60 * 1000);
  });

  it('render resume with status "out"', () => {
    mockUseContainer.mockReturnValue({
      summary: {
        dateKey: '2026-02-13',
        totalCalories: 2200,
        totalFastingMs: 10 * 60 * 60 * 1000,
        status: 'out',
      },
    });

    mockFormatDateKeyToBR.mockReturnValue('13/02/2026');
    mockFormatHMS.mockReturnValue('10:00:00');

    const { getByText } = renderWithTheme((<DailySummaryCard />) as any);

    expect(getByText('Resumo do dia')).toBeTruthy();
    expect(getByText('13/02/2026')).toBeTruthy();

    expect(getByText('Total de calorias: 2200 kcal')).toBeTruthy();
    expect(getByText('Tempo total de jejum: 10:00:00')).toBeTruthy();

    expect(getByText('Fora da meta ⚠️')).toBeTruthy();
  });
});
