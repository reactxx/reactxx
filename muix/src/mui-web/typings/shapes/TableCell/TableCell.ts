
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableCellClassKey, TableCellProps } from '../../mui/TableCell/TableCell';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableCellClassKey>,
  props: TableCellProps,
  theme: Theme
}>
