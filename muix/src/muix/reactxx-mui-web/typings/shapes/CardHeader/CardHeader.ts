
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CardHeaderClassKey, CardHeaderProps } from '../../mui/CardHeader/CardHeader';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CardHeaderClassKey>,
  props: CardHeaderProps,
  theme: Theme
}>
