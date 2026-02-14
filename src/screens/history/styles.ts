import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  gap: 12px;
  padding-bottom: 22px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  padding: 12px 16px 0 16px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const EmptyText = styled.Text`
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Separator = styled.View`
  height: 10px;
`;

export const List = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})`` as unknown as typeof FlatList<string>;

export const DayCard = styled.Pressable`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  gap: 6px;

  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

export const DayTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const RowText = styled.Text`
  color: ${({ theme }) => theme.colors.textDefault};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const StatusText = styled.Text`
  margin-top: 2px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;
