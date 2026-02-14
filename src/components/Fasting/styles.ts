import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #eee;

  background-color: ${({ theme }) => theme.colors.backgroundCard};

  gap: 8px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 900;

  color: ${({ theme }) => theme.colors.secondary};
`;

export const ProtocolInfo = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: -4px;
  margin-bottom: 4px;
`;

export const Subtitle = styled.Text`
  color: #666;
  margin-bottom: 10px;
`;

export const Timer = styled.Text`
  font-size: 36px;
  font-weight: 900;

  color: ${({ theme }) => theme.colors.secondary};
`;

export const PrimaryButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
`;

export const PrimaryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};

  font-weight: 800;
`;

export const OutlineButton = styled.Pressable`
  padding: 14px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
`;

export const OutlineButtonText = styled.Text`
  color: #111;
  font-weight: 800;

  color: ${({ theme }) => theme.colors.secondary};
`;
