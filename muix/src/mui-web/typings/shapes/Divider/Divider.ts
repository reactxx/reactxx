
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DividerClassKey, DividerProps } from '../../mui/Divider/Divider';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DividerClassKey>,
  props: DividerProps,
  theme: Theme
}>
