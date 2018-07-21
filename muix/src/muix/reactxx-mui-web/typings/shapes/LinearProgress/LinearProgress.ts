
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { LinearProgressClassKey, LinearProgressProps } from '../../mui/LinearProgress/LinearProgress';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<LinearProgressClassKey>,
  props: LinearProgressProps,
  theme: Theme
}>
