
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CardActionsClassKey, CardActionsProps } from '../../mui/CardActions/CardActions';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CardActionsClassKey>,
  props: CardActionsProps,
  theme: Theme
}>
