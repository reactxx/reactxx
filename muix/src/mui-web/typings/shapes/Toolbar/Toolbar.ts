
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ToolbarClassKey, ToolbarProps } from '../../mui/Toolbar/Toolbar';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ToolbarClassKey>,
  props: ToolbarProps,
  theme: Theme
}>
