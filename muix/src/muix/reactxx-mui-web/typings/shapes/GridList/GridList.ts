
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { GridListClassKey, GridListProps } from '../../mui/GridList/GridList';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<GridListClassKey>,
  props: GridListProps,
  theme: Theme
}>
