
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { BadgeClassKey, BadgeProps } from '../../mui/Badge/Badge';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<BadgeClassKey>,
  props: BadgeProps,
  theme: Theme
}>
