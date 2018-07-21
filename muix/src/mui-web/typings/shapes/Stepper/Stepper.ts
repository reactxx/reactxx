
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { StepperProps } from '../../mui/Stepper/Stepper';

export type Shape = Types.OverwriteShape<{
  props: StepperProps,
  theme: Theme
}>
