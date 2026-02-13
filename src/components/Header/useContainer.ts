import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IHeaderProps } from './types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { useStatusBarHeight } from '../../utils/statusBarHeight';

export const useContainer = (_: IHeaderProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const topInset = useStatusBarHeight();

  return { navigation, topInset };
};
