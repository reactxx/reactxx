
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TablePaginationClassKey, TablePaginationProps } from '../../mui/TablePagination/TablePagination';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TablePaginationClassKey>,
  props: TablePaginationProps,
  theme: Theme
}>
