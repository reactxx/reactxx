
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { StepLabelProps } from '../../mui/StepLabel/StepLabel';

export type Shape = Types.OverwriteShape<{
  props: StepLabelProps,
  theme: Theme
}>
