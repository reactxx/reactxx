
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TableRow/TableRow';
import { styles, TableRow, defaultProps } from 'reactxx-mui-web/TableRow/TableRow'
            
export const TableRowCreator = withStylesCreator<Shape>(styles, TableRow, {
  isMui: true,
  defaultProps
});
const TableRowComponent = TableRowCreator();
if (TableRow['muiName']) TableRowComponent['muiName'] = TableRow['muiName']
export default TableRowComponent;
