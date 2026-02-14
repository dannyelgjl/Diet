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

export const ProgressWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 6px;
  gap: 8px;
`;

export const ProgressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
`;

export const ProgressValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
`;

export const ProgressTrack = styled.View`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const ProgressFill = styled.View<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${Math.round($progress * 100)}%`};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
