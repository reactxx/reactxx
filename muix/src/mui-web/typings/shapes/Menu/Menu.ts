
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { MenuClassKey, MenuProps } from '../../mui/Menu/Menu';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<MenuClassKey>,
  props: MenuProps,
  theme: Theme
}>
