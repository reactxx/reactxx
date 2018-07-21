
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { AvatarClassKey, AvatarProps } from '../../mui/Avatar/Avatar';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<AvatarClassKey>,
  props: AvatarProps,
  theme: Theme
}>
