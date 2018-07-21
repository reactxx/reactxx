
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableRowClassKey, TableRowProps } from '../../mui/TableRow/TableRow';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableRowClassKey>,
  props: TableRowProps,
  theme: Theme
}>
