import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';

export interface StepIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepIconClasskey> {
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  icon: React.ReactNode;
}

export type StepIconClasskey = 'root' | 'active' | 'completed' | 'error';

declare const StepIcon: React.ComponentType<StepIconProps>;

export default StepIcon;
