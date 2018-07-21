
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { StepProps } from '../../mui/Step/Step';

export type Shape = Types.OverwriteShape<{
  props: StepProps,
  theme: Theme
}>
