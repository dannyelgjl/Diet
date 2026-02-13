import * as S from './styles';
import { IInputProps } from './types';

const Input = ({
  onChangeText,
  value,
  autoCapitalize,
  keyboardType,
  placeholder,

  secureTextEntry,
}: IInputProps) => {
  return (
    <S.Container
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
