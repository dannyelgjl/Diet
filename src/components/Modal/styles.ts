import styled from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.55);
  justify-content: center;
  padding: 16px;
`;

export const ModalCard = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 14px;
  padding: 16px;
  gap: 10px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const PrimaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
`;

export const PrimaryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const SecondaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  align-items: center;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const SecondaryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
