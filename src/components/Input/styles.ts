import styled from 'styled-components/native';

export const Container = styled.TextInput`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.textDefault};

  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};

  padding: 12px;
  font-size: 14px;

  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;
