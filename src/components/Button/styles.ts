import styled from 'styled-components/native';

export const Container = styled.Pressable`
  align-items: center;
  width: 100%;
  padding: 14px;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
