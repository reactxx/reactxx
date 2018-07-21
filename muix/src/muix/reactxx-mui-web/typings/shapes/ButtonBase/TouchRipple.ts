
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TouchRippleClassKey, TouchRippleProps } from '../../mui/ButtonBase/TouchRipple';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TouchRippleClassKey>,
  props: TouchRippleProps,
  theme: Theme
}>
