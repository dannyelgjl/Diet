import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
  gap: 16px;
  padding-bottom: 22px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const SelectedCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-width: 1px;
  border-color: #eee;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primaryWhite};
  gap: 6px;
`;

export const SelectedContent = styled.View`
  width: 50%;
`;

export const ButtonProtocol = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primaryBlack};

  padding: 8px 12px;
  border-radius: 8px;
`;

export const ButtonTextProtocol = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryWhite};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const SelectedLabel = styled.Text`
  margin-bottom: 6px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const SelectedValue = styled.Text``;

export const Separator = styled.View`
  height: 10px;
`;

export const List = styled(FlatList)`
  max-height: 300px;
`;

export const ProtocolCard = styled.Pressable<{ $active: boolean }>`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? '#111' : '#eee')};
  background-color: ${({ $active, theme }) =>
    $active ? '#111' : `${theme.colors.primaryWhite}`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProtocolInfo = styled.View``;

export const ProtocolName = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ $active, theme }) =>
    $active ? `${theme.colors.primaryWhite}` : '#111'};
`;

export const ProtocolMeta = styled.Text<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? '#ddd' : '#666')};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const DeleteButton = styled.Pressable<{ $active: boolean }>`
  padding: 6px 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ $active, theme }) =>
    $active ? `${theme.colors.primaryWhite}` : '#111'};
`;

export const DeleteButtonText = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ $active, theme }) =>
    $active ? `${theme.colors.primaryWhite}` : '#111'};
`;

export const CreateCard = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryWhite};
  padding: 12px;
  border-width: 1px;
  border-color: #eee;
  border-radius: 12px;
  gap: 10px;
`;

export const CreateTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const CreateSubtitle = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const Field = styled.View`
  flex: 1;
  gap: 6px;
`;

export const Label = styled.Text`
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
