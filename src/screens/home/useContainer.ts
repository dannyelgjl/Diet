import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/auth/auth.simple.store';
import { IHomeProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';

export const useContainer = (_: IHomeProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const logout = useAuthStore(s => s.logout);

  function handleLogout() {
    logout();
  }

  return { navigation, handleLogout };
};
