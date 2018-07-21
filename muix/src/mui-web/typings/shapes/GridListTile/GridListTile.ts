
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { GridListTileClassKey, GridListTileProps } from '../../mui/GridListTile/GridListTile';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<GridListTileClassKey>,
  props: GridListTileProps,
  theme: Theme
}>
