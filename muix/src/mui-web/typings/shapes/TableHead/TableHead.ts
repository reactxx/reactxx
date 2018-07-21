
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableHeadClassKey, TableHeadProps } from '../../mui/TableHead/TableHead';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableHeadClassKey>,
  props: TableHeadProps,
  theme: Theme
}>
