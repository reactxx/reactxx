
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DialogClassKey, DialogProps } from '../../mui/Dialog/Dialog';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DialogClassKey>,
  props: DialogProps,
  theme: Theme
}>
