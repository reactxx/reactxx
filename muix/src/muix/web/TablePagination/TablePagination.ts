
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TablePagination/TablePagination';
import { styles, TablePagination, defaultProps } from 'reactxx-mui-web/TablePagination/TablePagination'
            
export const TablePaginationCreator = withStylesCreator<Shape>(styles, TablePagination, {
  isMui: true,
  defaultProps
});
const TablePaginationComponent = TablePaginationCreator();
if (TablePagination['muiName']) TablePaginationComponent['muiName'] = TablePagination['muiName']
export default TablePaginationComponent;
