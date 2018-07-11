import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { SwitchBaseProps, SwitchBaseClassKey } from 'reactxx-muix/typings/internal/SwitchBase';

export interface SwitchProps
  extends StandardProps<SwitchBaseProps, SwitchClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

export type SwitchClassKey =
  | SwitchBaseClassKey
  | 'bar'
  | 'icon'
  | 'iconChecked'
  | 'switchBase'
  | 'colorPrimary'
  | 'colorSecondary';

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
