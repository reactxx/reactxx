
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TableBody/TableBody';
import { styles, TableBody, defaultProps } from 'reactxx-mui-web/TableBody/TableBody'
            
export const TableBodyCreator = withStylesCreator<Shape>(styles, TableBody, {
  isMui: true,
  defaultProps
});
const TableBodyComponent = TableBodyCreator();
if (TableBody['muiName']) TableBodyComponent['muiName'] = TableBody['muiName']
export default TableBodyComponent;
