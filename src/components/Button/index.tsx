import * as S from './styles';
import { IButtonProps } from './types';

const Button = ({ onPress, title }: IButtonProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.ButtonText>{title}</S.ButtonText>
    </S.Container>
  );
};

export default Button;
