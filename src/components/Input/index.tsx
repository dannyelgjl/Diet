import * as S from './styles';
import { IInputProps } from './types';
import { useTheme } from 'styled-components/native';

const Input = ({
  onChangeText,
  value,
  autoCapitalize,
  keyboardType,
  placeholder,
  secureTextEntry,
}: IInputProps) => {
  const theme = useTheme();

  return (
    <S.Container
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.mutedText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
