
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { SvgIconClassKey, SvgIconProps } from '../../mui/SvgIcon/SvgIcon';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<SvgIconClassKey>,
  props: SvgIconProps,
  theme: Theme
}>
