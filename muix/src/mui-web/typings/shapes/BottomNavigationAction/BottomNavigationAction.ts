
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { BottomNavigationActionClassKey, BottomNavigationActionProps } from '../../mui/BottomNavigationAction/BottomNavigationAction';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<BottomNavigationActionClassKey>,
  props: BottomNavigationActionProps,
  theme: Theme
}>
