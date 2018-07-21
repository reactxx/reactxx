
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { IconClassKey, IconProps } from '../../mui/Icon/Icon';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<IconClassKey>,
  props: IconProps,
  theme: Theme
}>
