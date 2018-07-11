import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { Orientation } from 'reactxx-muix/typings/Stepper';
import { StepButtonIcon } from 'reactxx-muix/typings/StepButton';
import { StepIconProps } from 'reactxx-muix/typings/StepIcon';

export interface StepLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepLabelClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  completed?: boolean;
  disabled?: boolean;
  error?: boolean;
  icon?: StepButtonIcon;
  last?: boolean;
  optional?: React.ReactNode;
  orientation?: Orientation;
  StepIconProps?: Partial<StepIconProps>;
}

export type StepLabelClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'active'
  | 'completed'
  | 'alternativeLabel'
  | 'error'
  | 'disabled'
  | 'label'
  | 'iconContainer'
  | 'labelContainer';

declare const StepLabel: React.ComponentType<StepLabelProps>;

export default StepLabel;
