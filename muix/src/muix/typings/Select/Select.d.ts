import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { InputProps } from 'reactxx-muix/typings/Input';
import { MenuProps } from 'reactxx-muix/typings/Menu';
import { SelectInputProps } from 'reactxx-muix/typings/Select/SelectInput';

export interface SelectProps
  extends StandardProps<InputProps, SelectClassKey, 'value' | 'onChange'>,
    Pick<SelectInputProps, 'onChange'> {
  autoWidth?: boolean;
  displayEmpty?: boolean;
  IconComponent?: React.ReactType;
  input?: React.ReactNode;
  MenuProps?: Partial<MenuProps>;
  multiple?: boolean;
  native?: boolean;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  renderValue?: (value: SelectProps['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  value?: Array<string | number> | string | number;
}

export type SelectClassKey = 'root' | 'select' | 'selectMenu' | 'disabled' | 'icon';

declare const Select: React.ComponentType<SelectProps>;

export default Select;
