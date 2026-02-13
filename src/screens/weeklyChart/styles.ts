import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding: 16px;
  gap: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const ToggleButton = styled.Pressable<{ $active: boolean }>`
  padding-vertical: 10px;
  padding-horizontal: 12px;
  border-radius: 999px;
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? '#111' : '#ddd')};
  background-color: ${({ $active, theme }) =>
    $active ? '#111' : `${theme.colors.primaryWhite}`};
`;

export const ToggleText = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ $active, theme }) =>
    $active ? `${theme.colors.primaryWhite}` : '#111'};
`;

export const ChartCard = styled.View`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #eee;
`;

export const ChartTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  margin-bottom: 10px;
`;

export const Footer = styled.Text`
  font-weight: ${({ theme }) => theme.fonts.Roboto_400Regular};
  color: #666;
`;
