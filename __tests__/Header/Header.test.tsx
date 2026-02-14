import React from 'react';
import { renderWithTheme, fireEvent } from '../../testUtils/renderWithTheme';
import { Header } from '../../src/components/Header';

jest.mock('../../src/components/Header/useContainer', () => ({
  useContainer: jest.fn(),
}));

import { useContainer } from '../../src/components/Header/useContainer';

describe('Header', () => {
  const mockUseContainer = useContainer as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function baseContainer(overrides: Partial<any> = {}) {
    return {
      navigation: {
        goBack: jest.fn(),
      },
      topInset: 0,
      ...overrides,
    };
  }

  it('render the title correctly', () => {
    mockUseContainer.mockReturnValue(baseContainer());

    const { getByText } = renderWithTheme(<Header title="Home" />);

    expect(getByText('Home')).toBeTruthy();
  });

  it('show button back when showBack=true', () => {
    const container = baseContainer();
    mockUseContainer.mockReturnValue(container);

    const { getByText } = renderWithTheme(<Header title="Tela" showBack />);

    const backButton = getByText('Voltar');
    expect(backButton).toBeTruthy();

    fireEvent.press(backButton);
    expect(container.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('dont show button back when showBack=false', () => {
    mockUseContainer.mockReturnValue(baseContainer());

    const { queryByText } = renderWithTheme(
      <Header title="Tela" showBack={false} />,
    );

    expect(queryByText('Voltar')).toBeNull();
  });

  it('render button of right when rightLabel exist', () => {
    const onRightPress = jest.fn();
    mockUseContainer.mockReturnValue(baseContainer());

    const { getByText } = renderWithTheme(
      <Header title="Tela" rightLabel="Sair" onRightPress={onRightPress} />,
    );

    const rightButton = getByText('Sair');
    expect(rightButton).toBeTruthy();

    fireEvent.press(rightButton);
    expect(onRightPress).toHaveBeenCalledTimes(1);
  });

  it('dont render button of right when rightLabel dont exist', () => {
    mockUseContainer.mockReturnValue(baseContainer());

    const { queryByText } = renderWithTheme(<Header title="Tela" />);

    expect(queryByText('Sair')).toBeNull();
  });
});
