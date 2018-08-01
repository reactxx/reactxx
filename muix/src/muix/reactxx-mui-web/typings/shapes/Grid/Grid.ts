
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { GridClassKey, GridProps } from '../../mui/Grid/Grid';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<GridClassKey>,
  props: GridProps,
  theme: Theme
}>
