
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DialogContentTextClassKey, DialogContentTextProps } from '../../mui/DialogContentText/DialogContentText';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DialogContentTextClassKey>,
  props: DialogContentTextProps,
  theme: Theme
}>
