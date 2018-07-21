
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { SnackbarContentClassKey, SnackbarContentProps } from '../../mui/SnackbarContent/SnackbarContent';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<SnackbarContentClassKey>,
  props: SnackbarContentProps,
  theme: Theme
}>
