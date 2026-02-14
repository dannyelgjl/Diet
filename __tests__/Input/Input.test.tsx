import React from 'react';
import { renderWithTheme, fireEvent } from '../../testUtils/renderWithTheme';
import Input from '../../src/components/Input';

describe('Input component', () => {
  it('renderiza com value e placeholder', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input value="Teste" onChangeText={() => {}} placeholder="Digite algo" />,
    );

    const input = getByPlaceholderText('Digite algo');

    expect(input).toBeTruthy();
  });

  it('chama onChangeText ao digitar', () => {
    const onChangeText = jest.fn();

    const { getByPlaceholderText } = renderWithTheme(
      <Input value="" onChangeText={onChangeText} placeholder="Nome" />,
    );

    const input = getByPlaceholderText('Nome');

    fireEvent.changeText(input, 'Daniel');

    expect(onChangeText).toHaveBeenCalledWith('Daniel');
  });

  it('recebe secureTextEntry corretamente', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        value=""
        onChangeText={() => {}}
        placeholder="Senha"
        secureTextEntry
      />,
    );

    const input = getByPlaceholderText('Senha');

    expect(input.props.secureTextEntry).toBe(true);
  });

  it('recebe keyboardType corretamente', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        value=""
        onChangeText={() => {}}
        placeholder="Calorias"
        keyboardType="numeric"
      />,
    );

    const input = getByPlaceholderText('Calorias');

    expect(input.props.keyboardType).toBe('numeric');
  });
});
