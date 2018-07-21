
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { StepButtonProps } from '../../mui/StepButton/StepButton';

export type Shape = Types.OverwriteShape<{
  props: StepButtonProps,
  theme: Theme
}>
