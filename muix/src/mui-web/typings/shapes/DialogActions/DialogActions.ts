
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DialogActionsClassKey, DialogActionsProps } from '../../mui/DialogActions/DialogActions';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DialogActionsClassKey>,
  props: DialogActionsProps,
  theme: Theme
}>
