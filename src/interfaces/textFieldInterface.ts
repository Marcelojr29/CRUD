export interface TextFieldInterface {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  mask?: string;
  isUpperCase?: boolean;
  isLabelSide?: boolean;
  withIconSearch?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  onKeyUp?: (value: string) => void;
}
