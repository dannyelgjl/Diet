import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.textDefault};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const SelectedCard = styled.View`
  padding: 14px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  gap: 6px;
`;

export const SelectedContent = styled.View`
  gap: 4px;
`;

export const SelectedLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textDefault};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const SelectedValue = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const ButtonProtocol = styled.TouchableOpacity`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 10px 12px;
  border-radius: 10px;
`;

export const ButtonTextProtocol = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const Separator = styled.View`
  height: 10px;
`;

export const List = styled(FlatList)`
  /* não prenda altura fixa se puder.
     Se quiser limitar, use max-height aqui mesmo */
`;

/**
 * Card do protocolo
 * - ativo: background = secondary (preto no light / branco no dark)
 * - inativo: background = backgroundCard
 */
export const ProtocolCard = styled.Pressable<{ $active: boolean }>`
  padding: 14px;
  border-radius: 14px;
  border-width: 1px;

  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.border};

  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.backgroundCard};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProtocolInfo = styled.View`
  flex: 1;
  gap: 2px;
`;

export const ProtocolName = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textDefault};
`;

export const ProtocolMeta = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.mutedText};
`;

export const DeleteButton = styled.Pressable<{ $active: boolean }>`
  padding: 8px 10px;
  border-radius: 10px;
  border-width: 1px;

  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.secondary};
`;

export const DeleteButtonText = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.secondary};
`;

export const CreateCard = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  padding: 14px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  gap: 10px;
`;

export const CreateTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.textDefault};
`;

export const CreateSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
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
  color: ${({ theme }) => theme.colors.textDefault};
`;

export const PrimaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
`;

export const PrimaryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
