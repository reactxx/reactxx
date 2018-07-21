
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableClassKey, TableProps } from '../../mui/Table/Table';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableClassKey>,
  props: TableProps,
  theme: Theme
}>
