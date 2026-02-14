import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  width: 100%;
  padding: 24px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.backgroundCard};
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const Logo = styled.Image`
  width: 180px;
  height: 180px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Credentials = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;
