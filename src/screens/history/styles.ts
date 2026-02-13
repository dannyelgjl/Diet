import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  gap: 12px;

  padding-bottom: 22px;
`;

export const TitleContainer = styled.View`
  padding: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const EmptyText = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Separator = styled.View`
  height: 10px;
`;

export const List = styled(FlatList).attrs({
  contentContainerStyle: { paddingHorizontal: 12 },
})`` as unknown as typeof FlatList<string>;

export const DayCard = styled.Pressable`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #eee;
  gap: 4px;

  background-color: ${({ theme }) => theme.colors.primaryWhite};
`;

export const DayTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const RowText = styled.Text``;

export const StatusText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
