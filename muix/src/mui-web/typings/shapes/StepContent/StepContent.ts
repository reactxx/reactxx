
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { StepContentProps } from '../../mui/StepContent/StepContent';

export type Shape = Types.OverwriteShape<{
  props: StepContentProps,
  theme: Theme
}>
