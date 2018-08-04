
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TableSortLabel/TableSortLabel';
import { styles, TableSortLabel, defaultProps } from 'reactxx-mui-web/TableSortLabel/TableSortLabel'
            
export const TableSortLabelCreator = withStylesCreator<Shape>(styles, TableSortLabel, {
  isMui: true,
  defaultProps
});
const TableSortLabelComponent = TableSortLabelCreator();
if (TableSortLabel['muiName']) TableSortLabelComponent['muiName'] = TableSortLabel['muiName']
export default TableSortLabelComponent;
