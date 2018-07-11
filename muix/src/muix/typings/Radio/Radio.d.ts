import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { SwitchBaseProps, SwitchBaseClassKey } from 'reactxx-muix/typings/internal/SwitchBase';

export interface RadioProps
  extends StandardProps<SwitchBaseProps, RadioClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

export type RadioClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
