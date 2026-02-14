import { useState } from 'react';
import { ILoginProps } from './types';
import { useAuthStore } from '../../store/auth/auth.simple.store';
import { Alert } from 'react-native';
import { useThemeStore } from '../../store/theme/theme.stores';

export const useContainer = (_: ILoginProps) => {
  const login = useAuthStore(state => state.login);
  const mode = useThemeStore(state => state.mode);

  const [email, setEmail] = useState('email-teste@teste.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return {
    onLogin,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    mode,
  };
};
