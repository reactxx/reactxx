
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListItemTextClassKey, ListItemTextProps } from '../../mui/ListItemText/ListItemText';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListItemTextClassKey>,
  props: ListItemTextProps,
  theme: Theme
}>
