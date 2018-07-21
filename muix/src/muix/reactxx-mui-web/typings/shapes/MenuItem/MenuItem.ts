
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { MenuItemClassKey, MenuItemProps } from '../../mui/MenuItem/MenuItem';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<MenuItemClassKey>,
  props: MenuItemProps,
  theme: Theme
}>
