import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { PaperProps } from 'reactxx-muix/typings/Paper';
import { ButtonProps } from 'reactxx-muix/typings/Button';

export interface MobileStepperProps extends StandardProps<PaperProps, MobileStepperClassKey> {
  activeStep?: number;
  backButton: React.ReactElement<any>;
  nextButton: React.ReactElement<any>;
  position?: 'bottom' | 'top' | 'static';
  steps: number;
  variant?: 'text' | 'dots' | 'progress';
}

export type MobileStepperClassKey =
  | 'root'
  | 'positionBottom'
  | 'positionTop'
  | 'positionStatic'
  | 'dots'
  | 'dot'
  | 'dotActive'
  | 'progress';

declare const MobileStepper: React.ComponentType<MobileStepperProps>;

export default MobileStepper;
