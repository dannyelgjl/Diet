import styled from 'styled-components/native';

export const Container = styled.TextInput`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryWhite};
  color: ${({ theme }) => theme.colors.primaryBlack};
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 12px;
`;
