
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TooltipClassKey, TooltipProps } from '../../mui/Tooltip/Tooltip';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TooltipClassKey>,
  props: TooltipProps,
  theme: Theme
}>
