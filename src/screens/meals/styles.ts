import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import type { Meal } from '../../store/meals/meals.store';

export const Container = styled.View`
  flex: 1;
  gap: 12px;
  padding-bottom: 22px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const TitleContainer = styled.View`
  padding: 12px 16px 0 16px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
  margin-top: 4px;
`;

export const Card = styled.View`
  margin: 0 16px;
  padding: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ListSeparator = styled.View`
  height: 10px;
`;

export const List = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})`` as unknown as typeof FlatList<Meal>;

export const MealRow = styled.View`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

export const MealInfo = styled.View`
  flex: 1;
  gap: 2px;
`;

export const MealName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const MealMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Actions = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export const ActionButton = styled.Pressable`
  padding: 6px 8px;
  border-radius: 8px;
`;

export const ActionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const DeleteText = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
