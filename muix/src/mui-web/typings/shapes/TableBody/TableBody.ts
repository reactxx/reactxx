
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableBodyClassKey, TableBodyProps } from '../../mui/TableBody/TableBody';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableBodyClassKey>,
  props: TableBodyProps,
  theme: Theme
}>
