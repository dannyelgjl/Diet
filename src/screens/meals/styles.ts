import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import type { Meal } from '../../store/meals/meals.store';

export const Container = styled.View`
  flex: 1;

  gap: 12px;

  padding-bottom: 22px;
`;

export const TitleContainer = styled.View`
  width: 100%;
  padding: 12px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};

  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Card = styled.View`
  padding: 12px;
  border-width: 1px;
  border-color: #eee;
  border-radius: 12px;
  gap: 10px;
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const PrimaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  background-color: #111;
  align-items: center;
`;

export const PrimaryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryWhite};

  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const ListSeparator = styled.View`
  height: 10px;
`;

export const List = styled(FlatList).attrs({
  contentContainerStyle: { paddingHorizontal: 12 },
})`` as unknown as typeof FlatList<Meal>;

export const MealRow = styled.View`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.primaryWhite};
`;

export const MealInfo = styled.View`
  flex: 1;
`;

export const MealName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const MealMeta = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Actions = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const ActionButton = styled.Pressable``;

export const ActionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const DeleteText = styled.Text`
  color: #cc0000;

  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
