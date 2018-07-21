
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { GridListTileBarClassKey, GridListTileBarProps } from '../../mui/GridListTileBar/GridListTileBar';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<GridListTileBarClassKey>,
  props: GridListTileBarProps,
  theme: Theme
}>
