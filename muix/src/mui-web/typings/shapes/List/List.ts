
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListClassKey, ListProps } from '../../mui/List/List';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListClassKey>,
  props: ListProps,
  theme: Theme
}>
