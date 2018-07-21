
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DialogContentClassKey, DialogContentProps } from '../../mui/DialogContent/DialogContent';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DialogContentClassKey>,
  props: DialogContentProps,
  theme: Theme
}>
