import React from 'react';
import { Modal as RNModal } from 'react-native';
import Input from '../Input';
import * as S from './styles';
import { IModalProps } from './types';

const Modal = ({
  visible,
  title = 'Editar refeição',
  nameValue,
  caloriesValue,
  onChangeName,
  onChangeCalories,
  onSave,
  onClose,
}: IModalProps) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <S.ModalOverlay>
        <S.ModalCard>
          <S.ModalTitle>{title}</S.ModalTitle>

          <Input
            placeholder="Nome"
            value={nameValue}
            onChangeText={onChangeName}
          />

          <Input
            placeholder="Calorias"
            value={caloriesValue}
            onChangeText={onChangeCalories}
            keyboardType="numeric"
          />

          <S.PrimaryButton onPress={onSave}>
            <S.PrimaryButtonText>Salvar alterações</S.PrimaryButtonText>
          </S.PrimaryButton>

          <S.SecondaryButton onPress={onClose}>
            <S.SecondaryButtonText>Cancelar</S.SecondaryButtonText>
          </S.SecondaryButton>
        </S.ModalCard>
      </S.ModalOverlay>
    </RNModal>
  );
};

export default Modal;
