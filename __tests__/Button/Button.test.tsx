import React from 'react';
import { fireEvent, renderWithTheme } from '../../testUtils/renderWithTheme';
import Button from '../../src/components/Button';

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render the title correctly', () => {
    const { getByText } = renderWithTheme(
      <Button title="Entrar" onPress={jest.fn()} />,
    );

    expect(getByText('Entrar')).toBeTruthy();
  });

  it('call onPress to press', () => {
    const onPress = jest.fn();

    const { getByText } = renderWithTheme(
      <Button title="Salvar" onPress={onPress} />,
    );

    fireEvent.press(getByText('Salvar'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('down broken case onPress it is a function mock (sanidade)', () => {
    const onPress = jest.fn();

    const { getByText } = renderWithTheme(
      <Button title="Continuar" onPress={onPress} />,
    );

    expect(() => fireEvent.press(getByText('Continuar'))).not.toThrow();
  });
});
