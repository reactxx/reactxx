
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListItemAvatarClassKey, ListItemAvatarProps } from '../../mui/ListItemAvatar/ListItemAvatar';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListItemAvatarClassKey>,
  props: ListItemAvatarProps,
  theme: Theme
}>
