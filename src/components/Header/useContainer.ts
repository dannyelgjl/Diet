import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IHeaderProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { useStatusBarHeight } from '../../utils/statusBarHeight';
import { useThemeStore } from '../../store/theme/theme.stores';
import { useTheme } from 'styled-components/native';

export const useContainer = (_: IHeaderProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const topInset = useStatusBarHeight();

  const mode = useThemeStore(state => state.mode);
  const toggleTheme = useThemeStore(state => state.toggle);
  const theme = useTheme();

  return { navigation, topInset, mode, toggleTheme, theme };
};
