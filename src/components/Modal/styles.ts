import styled from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  padding: 16px;
`;

export const ModalCard = styled.View`
  background-color: #fff;
  border-radius: 14px;
  padding: 16px;
  gap: 10px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const PrimaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  background-color: #111;
  align-items: center;
`;

export const PrimaryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryWhite};

  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const SecondaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  align-items: center;
`;

export const SecondaryButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
