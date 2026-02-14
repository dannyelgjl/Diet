import React from 'react';
import { ILoginProps } from './types';
import { useContainer } from './useContainer';
import logo from '../../assets/logo/diet.png';
import logoDark from '../../assets/logo/diet-dark.png';
import * as S from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function LoginScreen(props: ILoginProps) {
  const { onLogin, email, password, setEmail, setPassword, mode } =
    useContainer(props);

  return (
    <S.Container>
      <S.Content>
        <S.Logo source={mode === 'dark' ? logoDark : logo} />
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

        <Button onPress={onLogin} title="Entrar" />
      </S.Content>
    </S.Container>
  );
}
