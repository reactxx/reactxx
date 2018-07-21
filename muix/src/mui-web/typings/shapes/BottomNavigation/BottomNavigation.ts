
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { BottomNavigationClassKey, BottomNavigationProps } from '../../mui/BottomNavigation/BottomNavigation';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<BottomNavigationClassKey>,
  props: BottomNavigationProps,
  theme: Theme
}>
