
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TableHead/TableHead';
import { styles, TableHead, defaultProps } from 'reactxx-mui-web/TableHead/TableHead'
            
export const TableHeadCreator = withStylesCreator<Shape>(styles, TableHead, {
  isMui: true,
  defaultProps
});
const TableHeadComponent = TableHeadCreator();
if (TableHead['muiName']) TableHeadComponent['muiName'] = TableHead['muiName']
export default TableHeadComponent;
