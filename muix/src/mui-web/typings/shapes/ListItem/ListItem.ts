
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListItemClassKey, ListItemProps } from '../../mui/ListItem/ListItem';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListItemClassKey>,
  props: ListItemProps,
  theme: Theme
}>
