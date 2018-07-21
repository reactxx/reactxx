
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CardContentClassKey, CardContentProps } from '../../mui/CardContent/CardContent';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CardContentClassKey>,
  props: CardContentProps,
  theme: Theme
}>
