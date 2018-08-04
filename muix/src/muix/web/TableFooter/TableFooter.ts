
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TableFooter/TableFooter';
import { styles, TableFooter, defaultProps } from 'reactxx-mui-web/TableFooter/TableFooter'
            
export const TableFooterCreator = withStylesCreator<Shape>(styles, TableFooter, {
  isMui: true,
  defaultProps
});
const TableFooterComponent = TableFooterCreator();
if (TableFooter['muiName']) TableFooterComponent['muiName'] = TableFooter['muiName']
export default TableFooterComponent;
