
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { BackdropClassKey, BackdropProps } from '../../mui/Backdrop/Backdrop';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<BackdropClassKey>,
  props: BackdropProps,
  theme: Theme
}>
