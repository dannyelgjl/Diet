import styled from 'styled-components/native';

export const Container = styled.View<{ $topInset: number }>`
  width: 100%;
  padding: ${({ $topInset }) => $topInset}px 22px 22px 22px;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
`;

export const Spacer = styled.View`
  width: 60px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textDefault};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const LeftButton = styled.Pressable`
  width: 60px;
`;

export const LeftButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDefault};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;

export const RightButton = styled.Pressable`
  width: 60px;
  align-items: flex-end;
`;

export const RightButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.textDefault};
  font-family: ${({ theme }) => theme.fonts.Roboto_700Bold};
`;
