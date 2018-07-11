import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { PaperProps } from 'reactxx-muix/typings/Paper';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperProps extends StandardProps<PaperProps, StepperClasskey> {
  activeStep?: number;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  connector?: React.ReactElement<any> | React.ReactNode;
  nonLinear?: boolean;
  orientation?: Orientation;
}

export type StepperClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel';

declare const Stepper: React.ComponentType<StepperProps>;

export default Stepper;
