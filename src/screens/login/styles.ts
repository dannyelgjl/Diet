import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

export const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const Subtitle = styled.Text`
  color: #666;
  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;

export const Button = styled.Pressable<{ $loading: boolean }>`
  padding: 14px;
  border-radius: 10px;
  background-color: ${({ $loading }) => ($loading ? '#999' : '#111')};
  align-items: center;

  width: 100%;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryWhite};

  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const Credentials = styled.Text`
  font-size: 12px;
  color: #888;

  font-family: ${({ theme }) => theme.fonts.Roboto_400Regular};
`;
