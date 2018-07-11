import * as React from 'react';
import { StandardProps, PropTypes } from 'reactxx-muix/typings';
import { ButtonBaseProps } from 'reactxx-muix/typings/ButtonBase';

export interface IconButtonProps extends StandardProps<ButtonBaseProps, IconButtonClassKey> {
  color?: PropTypes.Color;
  disabled?: boolean;
  disableRipple?: boolean;
}

export type IconButtonClassKey =
  | 'root'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'label';

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
