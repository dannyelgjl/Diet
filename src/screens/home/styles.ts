import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  padding: 16px;
  gap: 16px;
  padding-bottom: 28px;
`;

export const HeaderBlock = styled.View`
  gap: 4px;
`;

export const DashboardTitle = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const DashboardSubtitle = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const ActionsBlock = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryWhite};
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
`;

export const ActionsTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const QuickButton = styled.Pressable`
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #eee;
  gap: 4px;
`;

export const QuickButtonTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const QuickButtonSubtitle = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;
