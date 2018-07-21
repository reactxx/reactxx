
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TableFooterClassKey, TableFooterProps } from '../../mui/TableFooter/TableFooter';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableFooterClassKey>,
  props: TableFooterProps,
  theme: Theme
}>
