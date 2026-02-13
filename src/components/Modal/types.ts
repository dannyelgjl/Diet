export interface IModalProps {
  visible: boolean;
  title?: string;

  nameValue: string;
  caloriesValue: string;

  onChangeName: (v: string) => void;
  onChangeCalories: (v: string) => void;

  onSave: () => void;
  onClose: () => void;
}
