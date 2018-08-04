
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Table/Table';
import { styles, Table, defaultProps } from 'reactxx-mui-web/Table/Table'
            
export const TableCreator = withStylesCreator<Shape>(styles, Table, {
  isMui: true,
  defaultProps
});
const TableComponent = TableCreator();
if (Table['muiName']) TableComponent['muiName'] = Table['muiName']
export default TableComponent;
