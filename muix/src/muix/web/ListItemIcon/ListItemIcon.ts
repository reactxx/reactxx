
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ListItemIcon/ListItemIcon';
import { styles, ListItemIcon, defaultProps } from 'reactxx-mui-web/ListItemIcon/ListItemIcon'
            
export const ListItemIconCreator = withStylesCreator<Shape>(styles, ListItemIcon, {
  isMui: true,
  defaultProps
});
const ListItemIconComponent = ListItemIconCreator();
if (ListItemIcon['muiName']) ListItemIconComponent['muiName'] = ListItemIcon['muiName']
export default ListItemIconComponent;
