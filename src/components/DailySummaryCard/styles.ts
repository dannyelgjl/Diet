import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #eee;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  gap: 6px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 900;

  color: ${({ theme }) => theme.colors.secondary};
`;

export const Subtitle = styled.Text`
  color: #666;
`;

export const RowText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
`;

export const StatusText = styled.Text`
  font-weight: 900;

  color: ${({ theme }) => theme.colors.secondary};
`;

export const StatusValue = styled.Text<{ $within: boolean }>`
  font-weight: 900;
  color: ${({ $within }) => ($within ? '#0a7' : '#c00')};
`;
