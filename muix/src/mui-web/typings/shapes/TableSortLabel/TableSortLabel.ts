
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableSortLabelClassKey, TableSortLabelProps } from '../../mui/TableSortLabel/TableSortLabel';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableSortLabelClassKey>,
  props: TableSortLabelProps,
  theme: Theme
}>
