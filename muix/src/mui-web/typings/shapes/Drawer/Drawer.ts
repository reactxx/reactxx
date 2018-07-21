
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DrawerClassKey, DrawerProps } from '../../mui/Drawer/Drawer';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DrawerClassKey>,
  props: DrawerProps,
  theme: Theme
}>
