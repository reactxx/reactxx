import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { Orientation } from 'reactxx-muix/typings/Stepper';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepContentClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  completed?: boolean;
  last?: boolean;
  optional?: boolean;
  orientation?: Orientation;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  TransitionProps?: TransitionProps;
}

export type StepContentClasskey = 'root' | 'last' | 'transition';

declare const StepContent: React.ComponentType<StepContentProps>;

export default StepContent;
