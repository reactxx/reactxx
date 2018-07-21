
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { SnackbarClassKey, SnackbarProps } from '../../mui/Snackbar/Snackbar';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<SnackbarClassKey>,
  props: SnackbarProps,
  theme: Theme
}>
