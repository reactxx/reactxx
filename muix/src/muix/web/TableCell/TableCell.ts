
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TableCell/TableCell';
import { styles, TableCell, defaultProps } from 'reactxx-mui-web/TableCell/TableCell'
            
export const TableCellCreator = withStylesCreator<Shape>(styles, TableCell, {
  isMui: true,
  defaultProps
});
const TableCellComponent = TableCellCreator();
if (TableCell['muiName']) TableCellComponent['muiName'] = TableCell['muiName']
export default TableCellComponent;
