import { useState } from 'react';
import { ILoginProps } from './types';
import { useAuthStore } from '../../store/auth/auth.simple.store';
import { Alert } from 'react-native';

export const useContainer = (_: ILoginProps) => {
  const login = useAuthStore(state => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  };
};
