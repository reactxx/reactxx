
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CircularProgressClassKey, CircularProgressProps } from '../../mui/CircularProgress/CircularProgress';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CircularProgressClassKey>,
  props: CircularProgressProps,
  theme: Theme
}>
