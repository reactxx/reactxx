
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { AppBarClassKey, AppBarProps } from '../../mui/AppBar/AppBar';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<AppBarClassKey>,
  props: AppBarProps,
  theme: Theme
}>
