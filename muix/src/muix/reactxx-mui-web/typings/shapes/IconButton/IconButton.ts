
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { IconButtonClassKey, IconButtonProps } from '../../mui/IconButton/IconButton';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<IconButtonClassKey>,
  props: IconButtonProps,
  theme: Theme
}>
