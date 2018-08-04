
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/List/List';
import { styles, List, defaultProps } from 'reactxx-mui-web/List/List'
            
export const ListCreator = withStylesCreator<Shape>(styles, List, {
  isMui: true,
  defaultProps
});
const ListComponent = ListCreator();
if (List['muiName']) ListComponent['muiName'] = List['muiName']
export default ListComponent;
