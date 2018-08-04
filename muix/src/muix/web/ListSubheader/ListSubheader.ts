
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ListSubheader/ListSubheader';
import { styles, ListSubheader, defaultProps } from 'reactxx-mui-web/ListSubheader/ListSubheader'
            
export const ListSubheaderCreator = withStylesCreator<Shape>(styles, ListSubheader, {
  isMui: true,
  defaultProps
});
const ListSubheaderComponent = ListSubheaderCreator();
if (ListSubheader['muiName']) ListSubheaderComponent['muiName'] = ListSubheader['muiName']
export default ListSubheaderComponent;
