import React from 'react';
import Modal from '../../src/components/Modal';
import { renderWithTheme, fireEvent } from '../../testUtils/renderWithTheme';

describe('Modal', () => {
  it('renderiza quando visible', () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    const { getByText } = renderWithTheme(
      <Modal
        visible
        nameValue=""
        caloriesValue=""
        onChangeName={() => {}}
        onChangeCalories={() => {}}
        onSave={onSave}
        onClose={onClose}
      />,
    );

    fireEvent.press(getByText('Salvar alterações'));
    expect(onSave).toHaveBeenCalled();
  });
});
