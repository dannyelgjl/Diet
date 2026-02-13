import React from 'react';
import { ILoginProps } from './types';
import { useContainer } from './useContainer';
import logo from '../../assets/logo/diet.png';
import * as S from './styles';
import Input from '../../components/Input';

export default function LoginScreen(props: ILoginProps) {
  const { onLogin, email, loading, password, setEmail, setPassword } =
    useContainer(props);

  return (
    <S.Container>
      <S.Content>
        <S.Logo source={logo} />
        <S.Subtitle>Login</S.Subtitle>

        <Input
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="E-mail"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Senha"
        />

        <S.Button onPress={onLogin} disabled={loading} $loading={loading}>
          <S.ButtonText>{loading ? 'Entrando...' : 'Entrar'}</S.ButtonText>
        </S.Button>
      </S.Content>
    </S.Container>
  );
}
