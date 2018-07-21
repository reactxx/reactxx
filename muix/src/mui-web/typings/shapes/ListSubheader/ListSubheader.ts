
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ListSubheaderClassKey, ListSubheaderProps } from '../../mui/ListSubheader/ListSubheader';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListSubheaderClassKey>,
  props: ListSubheaderProps,
  theme: Theme
}>
