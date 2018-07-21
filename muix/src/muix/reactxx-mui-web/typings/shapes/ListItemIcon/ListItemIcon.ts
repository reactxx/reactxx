
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListItemIconClassKey, ListItemIconProps } from '../../mui/ListItemIcon/ListItemIcon';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListItemIconClassKey>,
  props: ListItemIconProps,
  theme: Theme
}>
