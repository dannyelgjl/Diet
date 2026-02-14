import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  padding: 16px;
  gap: 12px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const ToggleButton = styled.Pressable<{ $active: boolean }>`
  padding: 10px 14px;
  border-radius: 999px;
  border-width: 1px;

  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.border};

  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.backgroundCard};
`;

export const ToggleText = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.secondary};
`;

export const ChartCard = styled.View`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

export const ChartTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 10px;
`;

export const Footer = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;
