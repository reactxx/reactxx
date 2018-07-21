
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CardClassKey, CardProps } from '../../mui/Card/Card';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CardClassKey>,
  props: CardProps,
  theme: Theme
}>
