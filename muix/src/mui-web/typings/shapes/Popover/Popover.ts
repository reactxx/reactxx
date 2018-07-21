
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { PopoverClassKey, PopoverProps } from '../../mui/Popover/Popover';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<PopoverClassKey>,
  props: PopoverProps,
  theme: Theme
}>
