import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { Orientation } from 'reactxx-muix/typings/Stepper';
import { ButtonBaseProps } from 'reactxx-muix/typings/ButtonBase';

export type StepButtonIcon = React.ReactElement<any> | string | number | null;

export interface StepButtonProps extends StandardProps<ButtonBaseProps, StepButtonClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  completed?: boolean;
  disabled?: boolean;
  icon?: StepButtonIcon;
  last?: boolean;
  optional?: React.ReactNode;
  orientation?: Orientation;
}

export type StepButtonClasskey = 'root' | 'vertical' | 'touchRipple';

declare const StepButton: React.ComponentType<StepButtonProps>;

export default StepButton;
