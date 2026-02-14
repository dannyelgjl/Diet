import React from 'react';
import { fireEvent, renderWithTheme } from '../../testUtils/renderWithTheme';
import { ThemeToggle } from '../../src/components/ThemeToggle';

jest.mock('../../src/components/ThemeToggle/useContainer', () => ({
  useContainer: jest.fn(),
}));

import { useContainer } from '../../src/components/ThemeToggle/useContainer';

describe('ThemeToggle', () => {
  const mockUseContainer = useContainer as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function baseContainer(overrides: Partial<any> = {}) {
    return {
      isDark: false,
      mode: 'light',
      toggle: jest.fn(),
      theme: {
        colors: {
          border: '#333',
          primary: '#fff',
          secondary: '#000',
        },
      },
      ...overrides,
    };
  }

  it('renders sun icon when theme is light', () => {
    mockUseContainer.mockReturnValue(baseContainer());

    const { getByText } = renderWithTheme(<ThemeToggle />);

    expect(getByText('☀️')).toBeTruthy();
  });

  it('renders moon icon when theme is dark', () => {
    mockUseContainer.mockReturnValue(
      baseContainer({
        isDark: true,
        mode: 'dark',
      }),
    );

    const { getByText } = renderWithTheme(<ThemeToggle />);

    expect(getByText('🌙')).toBeTruthy();
  });

  it('renders Switch with correct value when theme is light', () => {
    mockUseContainer.mockReturnValue(baseContainer());

    const { getByRole } = renderWithTheme(<ThemeToggle />);

    const switchComponent = getByRole('switch');
    expect(switchComponent.props.value).toBe(false);
  });

  it('renders Switch with correct value when theme is dark', () => {
    mockUseContainer.mockReturnValue(
      baseContainer({
        isDark: true,
        mode: 'dark',
      }),
    );

    const { getByRole } = renderWithTheme(<ThemeToggle />);

    const switchComponent = getByRole('switch');
    expect(switchComponent.props.value).toBe(true);
  });

  it('calls toggle when Switch value changes', () => {
    const toggle = jest.fn();

    mockUseContainer.mockReturnValue(
      baseContainer({
        toggle,
      }),
    );

    const { getByRole } = renderWithTheme(<ThemeToggle />);

    const switchComponent = getByRole('switch');

    fireEvent(switchComponent, 'valueChange', true);
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
