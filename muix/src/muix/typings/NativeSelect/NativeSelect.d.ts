import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { InputProps } from 'reactxx-muix/typings/Input';
import { MenuProps } from 'reactxx-muix/typings/Menu';
import { NativeSelectInputProps } from 'reactxx-muix/typings/NativeSelect/NativeSelectInput';

export interface NativeSelectProps
  extends StandardProps<InputProps, NativeSelectClassKey, 'value' | 'onChange'>,
    Pick<NativeSelectInputProps, 'onChange'> {
  IconComponent?: React.ReactType;
  input?: React.ReactNode;
  value?: string | number;
}

export type NativeSelectClassKey = 'root' | 'select' | 'selectMenu' | 'disabled' | 'icon';

declare const NativeSelect: React.ComponentType<NativeSelectProps>;

export default NativeSelect;
