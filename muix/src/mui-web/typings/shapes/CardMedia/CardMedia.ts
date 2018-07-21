
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CardMediaClassKey, CardMediaProps } from '../../mui/CardMedia/CardMedia';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CardMediaClassKey>,
  props: CardMediaProps,
  theme: Theme
}>
