import * as React from 'react';
import { StandardProps, PropTypes } from 'reactxx-muix/typings';
import { FormControlProps } from 'reactxx-muix/typings/FormControl';
import { FormHelperTextProps } from 'reactxx-muix/typings/FormHelperText';
import { InputProps } from 'reactxx-muix/typings/Input';
import { InputLabelProps } from 'reactxx-muix/typings/InputLabel';
import { FormControlClassKey } from 'reactxx-muix/typings/FormControl';
import { SelectProps } from 'reactxx-muix/typings/Select';

export interface TextFieldProps
  extends StandardProps<FormControlProps, TextFieldClassKey, 'onChange' | 'defaultValue'> {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  InputLabelProps?: Partial<InputLabelProps>;
  InputProps?: Partial<InputProps>;
  inputProps?: InputProps['inputProps'];
  inputRef?: React.Ref<any> | React.RefObject<any>;
  label?: React.ReactNode;
  margin?: PropTypes.Margin;
  multiline?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  select?: boolean;
  SelectProps?: Partial<SelectProps>;
  type?: string;
  value?: Array<string | number> | string | number;
}

export type TextFieldClassKey = FormControlClassKey;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
