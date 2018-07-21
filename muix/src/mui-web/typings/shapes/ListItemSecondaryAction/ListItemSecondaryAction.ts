
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListItemSecondaryActionClassKey, ListItemSecondaryActionProps } from '../../mui/ListItemSecondaryAction/ListItemSecondaryAction';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListItemSecondaryActionClassKey>,
  props: ListItemSecondaryActionProps,
  theme: Theme
}>
